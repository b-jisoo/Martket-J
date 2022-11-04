import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  addToCart,
  decreaseCart,
  reamoveFromCart,
} from "../../redux/cartSlice";
import { Product } from "../../type";

// ----------------------------css 시작----------------------------
const CartItemContainer = styled.div`
  display: flex;
  min-width: 800px;
  width: 1000px;
  /* max-width: 60%; */
  margin-top: 10px;
  align-items: center;
  /* border: 1px solid gray; */
  border-top: 1px solid gray;
  padding: 10px;
  /* border-radius: 1.5em; */
  /* box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2); */

  .title {
    margin: 10px;
    min-width: 300px;
    p {
      width: 100%;
      overflow: hidden; // 을 사용해 영역을 감출 것
      text-overflow: ellipsis; // 로 ... 을 만들기
      white-space: nowrap; // 아래줄로 내려가는 것을 막기위해
      max-width: 300px;
    }
  }
  .price {
    min-width: 110px;
  }
  .quantity {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100px;
    div {
      margin: 0 10px;
    }
  }
  .totalQuantity {
    width: 120px;
    margin: 0 70px;
  }
`;

const CartItemImage_Container = styled.div`
  margin-right: 20px;
  max-width: 50px;
  img {
    width: 50px;
    height: 70px;
    object-fit: contain;
  }
`;
// ----------------------------css 끝----------------------------

const CartItem = (cartItem: Product) => {
  const dispatch = useDispatch();
  const handleRemoveFromCart = (cartItem: Product) => {
    dispatch(reamoveFromCart(cartItem));
  };
  const handleDecreaseCart = (cartItem: Product) => {
    dispatch(decreaseCart(cartItem));
  };
  const handleIncreaseCart = (cartItem: Product) => {
    dispatch(addToCart(cartItem));
  };
  const convertPrice = (price: any) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <CartItemContainer>
      <CartItemImage_Container>
        <img src={`https://martket-j.herokuapp.com/${cartItem.images}`} />
      </CartItemImage_Container>
      <div className="title">
        <p> {cartItem.title}</p>
      </div>
      <p className="price">가격: {convertPrice(cartItem.price)}원</p>
      <div className="quantity">
        <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
        <div>수량 {cartItem.quantity}</div>
        <button onClick={() => handleIncreaseCart(cartItem)}>+</button>
      </div>
      <div className="totalQuantity">
        총가격: {`${convertPrice(cartItem.price * cartItem.quantity)}원`}
      </div>
      <button onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
    </CartItemContainer>
  );
};

export default CartItem;
