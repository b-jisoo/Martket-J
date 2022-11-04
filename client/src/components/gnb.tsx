import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { userInfo } from "../type";
import Auth from "./auth/auth";
import LeftForm from "./gnb/leftForm";
import RightForm from "./gnb/rightForm";

const Gnb = () => {
  window.scrollTo(0, 0); //스크롤 맨위로 이동
  const [user, setUser] = useState<userInfo>(); //유저의 데이터를 저장할 user 선언

  useEffect(() => {
    Auth().then((data) => setUser(data));
  }, []);
  if (!user) return null;

  return (
    <>
      <LeftForm />
      <RightForm user={user} />
    </>
  );
};

export default Gnb;
