import RegisterCSS from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callRegisterAPI } from "../../apis/MemberAPICalls";

// import Swal from "sweetalert2";

function Register() {
  const navigate = useNavigate();

  // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
  const dispatch = useDispatch();
  const member = useSelector((state) => state.memberReducer); // API 요청하여 가져온 loginMember 정보

  const [form, setForm] = useState({
    memberId: "",
    memberPwd: "",
    memberName: "",
  });

  useEffect(
    () => {
      if (member?.status === 201) {
        console.log("[Login] Register SUCCESS {}", member);
        navigate("/login", { replace: true });
      }
    }, // eslint-disable-next-line
    [member]
  );

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onClickLoginHandler = () => {
    // 클릭시 로그인으로 이동
    navigate("/login", { replace: true });
  };

  const onClickRegisterHandler = () => {
    dispatch(
      callRegisterAPI({
        form: form,
      })
    );
  };

  return (
    <div className={RegisterCSS.cardBody}>
      <div className={RegisterCSS.registerDiv}>
        <div>
          <h1 className={RegisterCSS.title}>Register</h1>
          <div className={RegisterCSS.description}>
            <span>Create an </span>
            <span className={RegisterCSS.emphasis}>account </span>
            <span>to access all the features of </span>
            <span className={RegisterCSS.emphasis}>Blue Island</span>
            <span>!!</span>
          </div>
        </div>
        <div className={RegisterCSS.registBox}>
          <div>
            <label>Your ID</label>
          </div>
          <div className={RegisterCSS.registContainer}>
            <input
              type="text"
              name="memberId"
              id="fileInput"
              placeholder="Ex: user01"
              autoComplete="off"
              onChange={onChangeHandler}
              className={RegisterCSS.inputBox}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#4275F4"
              className="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
            </svg>
          </div>
        </div>
        <div className={RegisterCSS.registBox}>
          <div>
            <label>Your Password</label>
          </div>
          <div className={RegisterCSS.registContainer}>
            <input
              type="password"
              name="memberPwd"
              placeholder="password"
              autoComplete="off"
              onChange={onChangeHandler}
              className={RegisterCSS.inputBox}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#4275F4"
              className="bi bi-shield-lock"
              viewBox="0 0 16 16"
            >
              <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
              <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z" />
            </svg>
          </div>
        </div>
        <div className={RegisterCSS.registBox}>
          <div>
            <label>Your Name</label>
          </div>
          <div className={RegisterCSS.registContainer}>
            <input
              type="text"
              name="memberName"
              placeholder="Ex: james"
              autoComplete="off"
              onChange={onChangeHandler}
              className={RegisterCSS.inputBox}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#4275F4"
              className="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
            </svg>
          </div>
        </div>
        <div className={RegisterCSS.registBox}>
          <button
            className={RegisterCSS.registBtn}
            onClick={onClickRegisterHandler}
          >
            Register
          </button>
        </div>
        <div>
          <span>Already have an account? </span>
          <span className={RegisterCSS.login} onClick={onClickLoginHandler}>
            Login
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;
