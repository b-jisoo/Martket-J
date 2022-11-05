import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../../redux";
import { getTotals } from "../../redux/cartSlice";
import { userInfo } from "../../type";
import Auth from "../auth/auth";
import { LogOut } from "../login/logout";

// ----------------------------css 시작----------------------------
const HeaderRight = styled.nav`
  position: fixed;
  right: 90px;
  top: 42px;
  z-index: 99;
  span {
    line-height: 30px;
    margin-left: 35px;
    font-size: 14px;
    color: black;
    font-weight: 600;
  }
`;
// ----------------------------css 끝----------------------------

const RightForm = ({ user }: any) => {
  const cartData = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals(cartData));
  }, [cartData]);
  return (
    <>
      {user.isAuth ? (
        <HeaderRight>
          <div>
            <span>
              <Link to="/cart">
                CART (<b>{cartData.cartTotalQuantity}</b>)
              </Link>
            </span>
            <span>
              {user.name}님 <LogOut />
            </span>
          </div>
        </HeaderRight>
      ) : (
        <HeaderRight>
          <div>
            <Link to="/cart">
              <span>
                CART (<b>{cartData.cartTotalQuantity}</b>){" "}
              </span>
            </Link>
            <Link to="/login">
              <span>LOGIN/JOIN</span>
            </Link>
          </div>
        </HeaderRight>
      )}
    </>
  );
};

export default RightForm;
