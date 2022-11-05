import { useMutation } from "@tanstack/react-query";
import axios from "../../axios/axios";
import { SubmitLogin } from "../../type";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";

// ----------------------------css 시작----------------------------
const LoginInput = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
  label {
    overflow: hidden;
    display: block;
    margin-bottom: 12px;
    /* border: 1px solid #bfbfbf; */
    border-bottom: 1px solid #bfbfbf;
    border-radius: 0;
    color: #555;
    input {
      width: 100%;
      height: 48px;
      line-height: 48px;
      padding: 0 0 0 3px;
      border: 0 none;
      color: #353535;
      font-size: 12px;
      &:focus {
        outline: none;
      }
    }
  }

  p {
    font-size: 11px;
    margin: 0 0 0 -4px;
    color: #353535;
  }
  button {
    margin-top: 10px;
    width: 100%;
    text-align: center;
    color: #fff;
    height: 48px;
    background-color: #1f1f1f;
    cursor: pointer;
  }
  .login-Checkbox_Container {
    display: flex;
    margin: 0;
    label {
      margin: 0;
      border: none;
    }
  }
`;

const LoginSignUp = styled(LoginInput)`
  margin-top: 10px;
  color: #353535;
  font-size: 15px;
`;
// ----------------------------css 끝----------------------------

axios.defaults.withCredentials = true; //쿠키 가져오는 설정
// URL 저장
const LOGIN_URL = "/api/users/login";
const LOGOUT_URL = "/api/users/logout";
// local storage에 사용할 key를 선언
const LS_KEY_ID = "LS_KEY_ID";

export const LoginForm = () => {
  //state 초기 설정, focus를 위한 Ref 사용
  const idRef = useRef<HTMLInputElement>(null); // useRef로 DOM 직접 선택
  const passwordRef = useRef<HTMLInputElement>(null); // useRef로 DOM 직접 선택
  const [loginID, setLoginID] = useState("");
  const [loginPassWord, setLoginPassWord] = useState("");
  const [saveIDFlag, setSaveIDFlag] = useState(false); //checkbox를 control할 saveIDFlag를 useState로 선언

  useEffect(() => {
    //페이지 이동시 아이디 input칸에 focus
    idRef.current?.focus();

    const idData = localStorage.getItem(LS_KEY_ID);
    // LS_KEY_ID가 false거나 저장된 값이 없을 경우, pass
    if (!idData) return;
    else {
      //LS_KEY_ID에 저장된 값(아이디)이 있을경우, 아이디 보여주기
      setSaveIDFlag(true);
      setLoginID(idData);
    }
  }, []);

  const { mutate: submitLogin } = useMutation(
    ({ userId, userPassword }: SubmitLogin) =>
      axios.post(LOGIN_URL, {
        email: userId,
        password: userPassword,
      }),
    {
      onSuccess: (response) => {
        //데이터가 왔다면 헤더에 쿠키를 저장
        if (response.data.userId) {
          const { accessToken } = response.data.userId;
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;

          // 아이디 저장을 체크 했을 경우, 로컬스토리지에 아이디 저장(true)
          if (saveIDFlag) localStorage.setItem(LS_KEY_ID, loginID);
          // 아이디 저장을 체크 하지않았을 경우, 로컬스토리지에 "" 저장(false)
          else localStorage.setItem(LS_KEY_ID, "");

          window.location.replace("/Martket-J/");
        } else {
          alert("아이디 또는 패스워드를 확인해주세요!");
        }
      },
    }
  );

  // 핸들링 함수----------------------------------------------------
  const handleSaveIDFlag = (e: SyntheticEvent) => {
    setSaveIDFlag(!saveIDFlag);
  };
  const handleChangeLoginID = (e: SyntheticEvent) => {
    setLoginID((e.target as HTMLInputElement).value);
  };
  const handleChangeLoginPassWord = (e: SyntheticEvent) => {
    setLoginPassWord((e.target as HTMLInputElement).value);
  };

  const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const userId = idRef.current!.value;
    // const userPassword = passwordRef.current!.value;
    submitLogin({ userId: loginID, userPassword: loginPassWord });

    passwordRef.current?.focus();
  };

  return (
    <>
      <div>회원 로그인</div>
      <LoginInput onSubmit={handleSubmitLogin}>
        <label>
          <input
            id="login"
            type="text"
            placeholder="아이디"
            ref={idRef}
            value={loginID}
            onChange={handleChangeLoginID}
          />
        </label>
        <label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호"
            ref={passwordRef}
            value={loginPassWord}
            onChange={handleChangeLoginPassWord}
          />
        </label>
        <p className="login-Checkbox_Container">
          <input
            type="checkbox"
            id="id_checkbox"
            checked={saveIDFlag}
            onChange={handleSaveIDFlag}
          />
          <label htmlFor="id_checkbox">
            <span>아이디 저장</span>
          </label>
        </p>
        <button>로그인</button>
      </LoginInput>
      <LoginSignUp>
        <Link to="/signup">회원가입</Link>
      </LoginSignUp>
    </>
  );
};

export default LoginForm;
