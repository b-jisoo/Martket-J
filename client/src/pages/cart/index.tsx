import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../redux";
import { clearCart, getTotals } from "../../redux/cartSlice";
import CartItem from "../../components/cart/items";

// ----------------------------css 시작----------------------------
const CartQuantity = styled.div`
  margin: 100px 0 0 250px;
`;
const CartQuantity_null = styled.div`
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
`;

const CartContainer = styled.div`
  display: flex;
  /* border: 1px solid black; */

  margin: 0 0 0 250px;
  min-height: 200px;
  .clear_cart {
    margin-top: 30px;
    width: 150px;
  }
  .cart-info {
    display: flex;
    margin-left: 30px;
    /* border-radius: 1.5em; */

    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    width: 500px;
    height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .cart-paymentBtn {
      margin-top: 50px;
      width: 200px;
      height: 30px;
      color: #fff;
      background-color: #e44454;
      border-color: #c94e5a;
      cursor: pointer;
      text-transform: none;
      text-decoration: none;
      font-weight: 400;
      border-radius: 0.25rem;
    }
    .cart-subtotal {
      font-size: 30px;
      font-weight: bold;
      height: 150px;
      text-align: center;
    }
  }
`;
// ----------------------------css 끝----------------------------

const Cart = () => {
  //const { cartTotalQuantity } = useSelector((state: RootState) => state.cart);
  const cartData = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals(cartData));
  }, [cartData]);

  // cart에 있는 상품 모두 삭제하는 핸들링 함수
  const handleClearCart = () => {
    dispatch(clearCart(cartData));
  };

  const convertPrice = (price: any) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <CartQuantity>
        <b>{cartData.cartTotalQuantity}</b> 개의 상품이 담겼습니다.
      </CartQuantity>
      {cartData.cartItems.length === 0 ? (
        <CartQuantity_null>
          <p>담긴 상품이 없습니다.</p>
        </CartQuantity_null>
      ) : (
        <CartContainer>
          <div>
            {cartData.cartItems?.map((cartItem) => (
              <CartItem {...cartItem} key={cartItem._id} />
            ))}
            <button className="clear_cart" onClick={() => handleClearCart()}>
              Clear Cart
            </button>
          </div>
          <div className="cart-info">
            <div className="cart-subtotal">
              <span>Subtotal : </span>
              <span>{convertPrice(cartData.cartTotalAmount)}원</span>
            </div>
            <button className="cart-paymentBtn">결제하기</button>
          </div>
        </CartContainer>
      )}
    </>
  );
};
export default Cart;
