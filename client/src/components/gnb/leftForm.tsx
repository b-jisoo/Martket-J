import { Link, Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
// ----------------------------css 시작----------------------------
const SideMenuBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 90;

  img {
    width: 200px;
  }
  ul {
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-left: 30px;
    font-weight: bold;
    font-size: 17px;
    text-transform: uppercase;
    li {
      .category {
        margin-left: 20px;
        font-size: 14px;
        font-family: 500;
      }
    }
  }
`;
// ----------------------------css 끝----------------------------

const LeftForm = () => {
  const category = ["top", "outer", "pants", "dress", "shoes", "bag", "etc"];

  return (
    <div>
      <SideMenuBar className="gnb">
        <Link to="/">
          <img id="logo" src="/Market_logo.png" alt="logo" />
        </Link>
        <ul>
          <li>
            <Link to="/products">Shopping</Link>
          </li>
          {category.map((category) => (
            <li>
              <Link to={`/${category}`}>{`- ${category}`}</Link>
            </li>
          ))}
          <li>
            <br />
            <Link to="/community">COMMUNITY</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      </SideMenuBar>
    </div>
  );
};

export default LeftForm;
