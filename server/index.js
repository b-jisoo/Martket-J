import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import config from "./config/key.js";
import cors from "cors";
//미들 웨어를 등록해주는 메서드
import userApi from "./routes/users.js";
import productApi from "./routes/product.js";
import board from "./routes/board.js";

const app = express();

//몽고 DB 설정
const connect = mongoose
  .connect(config().mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
//   });
// }

// cors 설정 - 브라우저에서 포트 다르면 통신 막음
app.use(
  cors({
    origin: true, // '*' 안됨 -> 정확한 주소 또는 origin: true로 해도 됨
    credentials: true,
  })
);

// bodyParser가 client로부터 오는 정보를 서버에서 분석해서 가져올 수 있게 해준다.
app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json - json 타입 분석
app.use(cookieParser());

app.use("/api/users", userApi);
app.use("/api/product", productApi);
app.use("/api/board", board);

app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});

export default app;
