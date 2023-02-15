import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import Swal from "sweetalert2";

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { callLogoutAPI } from "../../apis/MemberAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";

import LoginModal from "./LoginModal";
import headerStyle from "./Header.module.css";

function Header() {
  //const isLogin = false;
  const navigate = useNavigate();

  // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
  const dispatch = useDispatch();
  const isLogin = window.localStorage.getItem("accessToken"); // Local Storage 에 token 정보 확인

  const [loginModal, setLoginModal] = useState(false);

  let loginUser = null;

  if (isLogin !== undefined && isLogin !== null) {
    const temp = decodeJwt(window.localStorage.getItem("accessToken"));

    console.log("temp", temp);

    loginUser = temp.sub;
  }

  const onClickLogoHandler = () => {
    // 로고 클릭시 메인 페이지로 이동
    navigate("/", { replace: true });
  };

  const onClickLogoutHandler = () => {
    window.localStorage.removeItem("accessToken");
    //로그아웃
    dispatch(callLogoutAPI());

    Swal.fire({
      icon: "success",
      text: "로그아웃이 되어 메인화면으로 이동합니다.",
    });
    // alert("로그아웃이 되어 메인화면으로 이동합니다.");
    navigate("/", { replace: true });
    window.location.reload();
  };

  function BeforeLogin() {
    return (
      <div className={headerStyle.member}>
        <Navbar>
          <Dropdown className="d-inline-block">
            <Dropdown.Toggle id="dropdown-item-button">
              <img
                alt="member.png"
                src={process.env.PUBLIC_URL + "/images/member.png"}
                width="30"
                height="30"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-50">
              <Dropdown.Item>
                <NavLink to="/login" className={headerStyle.dropDown}>
                  로그인
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <NavLink to="/register" className={headerStyle.dropDown}>
                  회원가입
                </NavLink>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar>
      </div>
    );
  }

  function AfterLogin() {
    return (
      <div className={headerStyle.member}>
        <div className={headerStyle.loginComment}>
          <span className={headerStyle.loginMember}>{loginUser}</span>
          <span className={headerStyle.welcome}>님 환영합니다.</span>
        </div>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">
            <img
              alt="member.png"
              src={process.env.PUBLIC_URL + "/images/member.png"}
              width="30"
              height="30"
            />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <button
                className={headerStyle.HeaderBtn}
                onClick={onClickLogoutHandler}
              >
                로그아웃
              </button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }

  return (
    <>
      {loginModal ? <LoginModal setLoginModal={setLoginModal} /> : null}
      <Navbar bg="primary" expand="lg">
        <Container fluid>
          <Navbar.Brand className={headerStyle.logo}>
            <img
              alt="logo.png"
              src={process.env.PUBLIC_URL + "/images/logoWhale.png"}
              width="50"
              height="50"
              className="d-inline-block align-top float-right"
              onClick={onClickLogoHandler}
            />
          </Navbar.Brand>
        </Container>

        {/* 로그인 상태에 따라 다른 컴포넌트 랜더링 */}
        {isLogin == null || isLogin === undefined ? (
          <BeforeLogin />
        ) : (
          <AfterLogin />
        )}
      </Navbar>
    </>
  );
}

export default Header;
