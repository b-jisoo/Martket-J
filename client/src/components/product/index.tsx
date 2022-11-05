import { Link } from "react-router-dom";
import styled from "styled-components";
import { Product } from "../../type";

// ----------------------------css 시작----------------------------
const Item = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  width: 25%;
  margin: 0 0 2.5%;
  padding: 0 0.75%;
  box-sizing: border-box;

  img {
    max-width: 100%;
    height: 100%;
    margin-top: 5px;
    border-radius: 0.8em;
  }
  div {
    p {
      overflow: hidden; // 을 사용해 영역을 감출 것
      text-overflow: ellipsis; // 로 ... 을 만들기
      white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
      font-size: 16px;
      font-weight: bold;
      &.black {
        color: black;
      }
    }
  }
`;
// ----------------------------css 끝----------------------------

const SERVER_URL = "https://martket-j.herokuapp.com/";
const convertPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductItem = (product: Product) => {
  return (
    <Item>
      <Link to={`/products/${product._id}`}>
        <img
          style={{ width: "300px", height: "300px" }}
          src={`${SERVER_URL}${product.images[0]}`}
        />
      </Link>
      <div>
        <Link to={`/products/${product._id}`}>
          <p>{product.title}</p>
        </Link>
        <p className="black">{convertPrice(product.price)}원</p>
        {/* <button onClick={() => handlAddToCart(product)}>담기</button> */}
      </div>
    </Item>
  );
};

export default ProductItem;
