import express from "express";
import { Board } from "../models/Board.js";
const router = express.Router();

//게시글 번호

// 게시글 추가하기
router.post("/create", (req, res) => {
  const board = new Board(req.body);

  board.save((err, doc) => {
    if (err) return res.status(400).send(err);
    else res.status(200).json({ success: true, doc: doc });
  });
});

// 게시글 삭제
router.post("/remove", (req, res) => {
  Board.findOneAndDelete({
    postId: req.body.postId,
    _id: req.body._id,
  }) // 이 두 조건에 해당하는 db모델 지우기.
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      else res.status(200).json({ success: true, doc: doc });
    });
});

//게시글 수정 요청
router.post("/update", (req, res) => {
  Board.updateOne(
    { postId: req.body.postId },
    {
      $set: {
        writer: req.body.writer,
        title: req.body.title,
        content: req.body.content,
      },
    }
  ).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    else res.status(200).json({ success: true, doc: doc });
  });
});

// 특정 게시글 내용 불러오기 요청
router.post("/getBoardDetail", (req, res) => {
  Board.find({ postId: req.body.postId }).exec((err, board) => {
    if (err) return res.status(400).send({ success: false, err });
    return res.status(200).json({ success: true, board });
  });
});

// 전체 게시글 내용 불러오기 요청
router.get("/getBoardList", paginatedResults(Board), (req, res) => {
  res.json(res.paginatedResults);
});

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalIndex = await model.countDocuments().exec();

    const results = {};
    results.totalIndex = totalIndex;
    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = await model
        .find()
        .sort({ _id: -1 })
        .limit(limit)
        .skip(startIndex)
        .exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}
export default router;
