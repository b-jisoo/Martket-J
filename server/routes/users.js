import express from "express";
const router = express.Router();
import { User } from "../models/User.js";
import { Product } from "../models/Product.js";
// const { Payment }  from ("../models/Payment";

import { auth } from "../middleware/auth.js";
import async from "async";

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history,
  });
});

router.post("/signup", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });

    // 비밀번호 동일한지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      // 랜덤 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp, {
          httpOnly: true,
        });
        res.status(200).cookie("w_auth", user.token, { httpOnly: true }).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

router.post("/addToCart", auth, (req, res) => {
  //먼저  User Collection에 해당 유저의 정보를 가져오기
  User.findOne(
    { _id: req.user._id }, //해당유저가 한명
    (err, userInfo) => {
      // 에러, 유저정보
      // 가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어 있는지 확인
      let duplicate = false;
      userInfo.cart.forEach((item) => {
        if (item.id === req.body.productId) {
          duplicate = true;
        }
      });

      //상품이 이미 있을때, 상품개수 1을 올려줌
      if (duplicate) {
        User.findOneAndUpdate(
          { _id: req.user._id, "cart.id": req.body.productId },
          { $inc: { "cart.$.quantity": 1 } },
          { new: true },
          (err, userInfo) => {
            if (err) return res.status(200).json({ success: false, err });
            res.status(200).send(userInfo.cart); //카트부분만의 정보를 보내줌
          }
        );
      }
      //상품이 이미 있지 않을때
      else {
        User.findOneAndUpdate(
          { _id: req.user._id },
          {
            $push: {
              cart: {
                id: req.body.productId,
                quantity: 1,
                date: Date.now(),
              },
            },
          },
          { new: true },
          (err, userInfo) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).send(userInfo.cart);
          }
        );
      }
    }
  );
});

router.get("/removeFromCart", auth, (req, res) => {
  //먼저 cart안에 내가 지우려고 한 상품을 지워주기
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: { cart: { id: req.query.id } },
    },
    { new: true },
    (err, userInfo) => {
      let cart = userInfo.cart;
      let array = cart.map((item) => {
        return item.id;
      });

      //product collection에서  현재 남아있는 상품들의 정보를 가져오기

      //productIds = ['5e8961794be6d81ce2b94752', '5e8960d721e2ca1cb3e30de4'] 이런식으로 바꿔주기
      Product.find({ _id: { $in: array } })
        .populate("writer")
        .exec((err, productInfo) => {
          return res.status(200).json({
            productInfo,
            cart,
          });
        });
    }
  );
});

router.post("/successBuy", auth, (req, res) => {
  //1. User Collection 안에  History 필드 안에  간단한 결제 정보 넣어주기
  let history = [];
  let transactionData = {};

  req.body.cartDetail.forEach((item) => {
    history.push({
      dateOfPurchase: Date.now(),
      name: item.title,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID,
    });
  });
  //2. Payment Collection 안에  자세한 결제 정보들 넣어주기
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  transactionData.data = req.body.paymentData;
  transactionData.product = history;

  //history 정보 저장
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });

      //payment에다가  transactionData정보 저장
      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });

        //3. Product Collection 안에 있는 sold 필드 정보 업데이트 시켜주기

        //상품 당 몇개의 quantity를 샀는지

        let products = [];
        doc.product.forEach((item) => {
          products.push({ id: item.id, quantity: item.quantity });
        });

        async.eachSeries(
          products,
          (item, callback) => {
            Product.update(
              { _id: item.id },
              {
                $inc: {
                  sold: item.quantity,
                },
              },
              { new: false },
              callback
            );
          },
          (err) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({
              success: true,
              cart: user.cart,
              cartDetail: [],
            });
          }
        );
      });
    }
  );
});

export default router;
