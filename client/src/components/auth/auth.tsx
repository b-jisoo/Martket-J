import axios from "../../axios/axios";
const AUTH_URL = "/api/users/auth";

/*
cart: []
email: "30"
history: []
isAdmin: false
isAuth: true
name: "301"
role: 0
_id: "6325386216b3189cfdce47d8"
*/

/**
 * 쿠키를 이용해 Auth체크 하는 함수입니다.
 * @returns 유저 데이터
 */
export const Auth = async () => {
  const response = await axios.get(AUTH_URL);
  const data = response.data;

  return data;
};

export default Auth;
