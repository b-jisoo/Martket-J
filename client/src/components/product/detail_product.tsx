import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "../../axios/axios";
import { Product } from "../../type";
import styled from "styled-components";
import { QueryKeys, restFetcher } from "../../queryClient";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
// ----------------------------css 시작----------------------------
const ProductInfoWrap = styled.div`
  min-width: 800px;
  margin: 80px 150px 0 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  color: #000000;

  .section1,
  .section2 {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .Product_Title {
    font-size: 36px;
    line-height: 45px;
    margin-bottom: 20px;
  }

  .Product_Price {
    font-size: 36px;
    line-height: 45px;
    margin-bottom: 138px;
  }

  .Product_Description {
    font-size: 24px;
    line-height: 10px;
    margin-bottom: 20px;
  }
`;

const Product_Img = styled.div`
  width: 100%;
  box-sizing: border-box;
  img {
    border-radius: 1.5em;
    width: 90%;
  }
`;

const Product_Info2 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Delivery = styled.div`
  width: 150px;
  height: 20px;
  margin-bottom: 20px;

  .FreeD {
    font-size: 16px;
    line-height: 20px;
    color: #767676;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background: #c4c4c4;
  margin-bottom: 30px;
`;

const Amount = styled.div`
  position: relative;
  width: 150px;
  height: 50px;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  margin-bottom: 30px;

  .Minus {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 50%;
    left: 14px;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .Count {
    position: absolute;
    width: 56px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #c4c4c4;
    border-top: none;
    border-bottom: none;
  }

  .Count_Span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .Plus {
    position: absolute;
    width: 20px;
    height: 40px;
    top: 50%;
    right: 14px;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

const Sum = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  .Sum_Price {
    font-size: 18px;
    font-weight: 500;
    line-height: 23px;
    color: #000000;
  }

  .Sum_Total {
    font-size: 18px;
    line-height: 23px;
    color: #767676;
  }

  .Sum_Total_Count {
    font-size: 18px;
    line-height: 30px;
    color: black;
  }
  .Sum_Total_Count::after {
    content: "|";
    width: 5px;
    height: 22px;
    color: #c4c4c4;
    padding: 0px 11px;
  }

  .Sum_Total_Price {
    font-size: 28px;
    line-height: 18px;
    color: black;
  }

  .Sum_Total_Unit {
    font-size: 18px;
    line-height: 23px;
    color: black;
  }
`;

const Btn = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;

  .Btn_But {
    width: 300px;
    height: 60px;
    border-radius: 5px;
    background: black;
    border: none;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    line-height: 22px;
    color: #ffffff;
    margin-right: 44px;
  }
  .Btn_Cart {
    width: 200px;
    height: 60px;
    border-radius: 5px;
    background: #767676;
    border: none;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
    line-height: 22px;
    color: #ffffff;
  }
`;
// ----------------------------css 끝----------------------------

/*
  data.data.product[0]
categorys: 1
createdAt: "2022-09-25T15:25:59.377Z"
description: "무지 기본 라운드 면 반팔 티셔츠"
images: Array(1)
0: "uploads\1664119542622_t02.PNG"
length: 1
__proto__: Array(0)
price: 8000
sold: 0
title: "베이직 라운드 반팔 티셔츠 "
updatedAt: "2022-09-25T15:25:59.377Z"
views: 0
_id: "6330730737b26e2780d46e24"
*/

const convertPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function Detail_product(product: Product) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlAddToCart = () => {
    dispatch(addToCart(product));
    navigate("/cart"); //클릭시 cart로 페이지 이동
  };

  return (
    <>
      <ProductInfoWrap>
        <section className="section1">
          <Product_Img>
            <img src={`https://martket-j.herokuapp.com/${product.images}`} />
          </Product_Img>
        </section>
        <section className="section2">
          <Product_Info2>
            <p className="Product_Title">{product.title}</p>
            <span className="Product_Price">
              {convertPrice(product.price)}원
            </span>
            <span className="Product_Description">{product.description}</span>
          </Product_Info2>
          <Delivery>
            <p className="FreeD">택배배송 / 무료배송</p>
          </Delivery>

          <Line></Line>
          <Sum>
            <div>
              <span className="Sum_Total_Count">총 상품 금액</span>
            </div>

            <div>
              <span className="Sum_Total">
                총 수량 <span className="Sum_Total_Price">1개 </span>
              </span>
              <span className="Sum_Total_Price">
                {convertPrice(product.price)}원
              </span>
            </div>
          </Sum>
          <Btn>
            {/* <button className="Btn_But">바로 구매</button> */}
            <button className="Btn_Cart" onClick={handlAddToCart}>
              장바구니 담기
            </button>
          </Btn>
        </section>
      </ProductInfoWrap>
    </>
  );
}

export default Detail_product;
