import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "../../axios/axios";
import FileUpload from "./FileUpload";

const FILEUPLOAD_URL = "/api/product";
const Categorys = [
  { key: 1, value: "TOP" },
  { key: 2, value: "OUTER" },
  { key: 3, value: "PANTS" },
  { key: 4, value: "DRESS" },
  { key: 5, value: "SHOES" },
  { key: 6, value: "BAG" },
  { key: 7, value: "ETC" },
];

function AddForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState(1);
  const [images, setImages] = useState([] as any);

  const handleChangeTitle = (e: any) => {
    setTitle(e.currentTarget.value);
  };

  const handleChangeDescription = (e: any) => {
    setDescription(e.currentTarget.value);
  };

  const handleChangePrice = (e: any) => {
    setPrice(e.currentTarget.value);
  };

  const handleChangeCategory = (e: any) => {
    setCategory(e.currentTarget.value);
  };

  const handleupdateImages = (newImages: any) => {
    setImages(newImages);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!images || !title || !description || !price || !category) {
      return alert("모든 칸을 채워주세요");
    } //유효성 체크 -> 모든 칸이 채워지도록

    //서버에 채운 값들을 req로 보낸다

    const body = {
      //로그인 된 사람의 ID
      title,
      description,
      price: Number(price),
      images,
      categorys: category,
    };

    axios.post(FILEUPLOAD_URL, body).then((res) => {
      if (res.data.success) {
        alert("상품 업로드 성공");
        navigate("/");
      } else {
        alert("상품 업로드 실패");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>상품 업로드</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <FileUpload moveFunction={handleupdateImages} />

        <br />
        <br />
        <label>이름</label>
        <input onChange={handleChangeTitle} value={title} />
        <br />
        <br />
        <label>설명</label>
        <textarea onChange={handleChangeDescription} value={description} />
        <br />
        <br />
        <label>가격</label>
        <input onChange={handleChangePrice} value={price} />
        <br />
        <br />
        <select onChange={handleChangeCategory} value={category}>
          {Categorys.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button onClick={handleSubmit}>확인</button>
      </form>
    </div>
  );
}

export default AddForm;
