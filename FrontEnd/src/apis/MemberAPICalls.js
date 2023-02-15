import { GET_MEMBER, POST_LOGIN, POST_REGISTER } from "../modules/MemberModule";
import Swal from "sweetalert2";

export const callGetMemberAPI = ({ memberId }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/member/${memberId}`;

  return async (dispatch, getState) => {
    // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
    // 서버에서 cors 허용을 해주어야 함
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[MemberAPICalls] callGetMemberAPI RESULT : ", result);

    dispatch({ type: GET_MEMBER, payload: result });
  };
};

export const callLoginAPI = ({ form }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/auth/login`;

  return async (dispatch, getState) => {
    // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
    // 서버에서 cors 허용을 해주어야 함
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        memberId: form.memberId,
        memberPwd: form.memberPwd,
      }),
    }).then((response) => response.json());

    console.log("[MemberAPICalls] callLoginAPI RESULT : ", result);
    if (result.status === 200) {
      window.localStorage.setItem("accessToken", result.data.accessToken);
    }
    dispatch({ type: POST_LOGIN, payload: result });
  };
};

export const callLogoutAPI = () => {
  return async (dispatch, getState) => {
    dispatch({ type: POST_LOGIN, payload: "" });
    console.log("[MemberAPICalls] callLogoutAPI RESULT : SUCCESS");
  };
};

export const callRegisterAPI = ({ form }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/auth/signup`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({
        memberId: form.memberId,
        memberPwd: form.memberPwd,
        memberName: form.memberName,
      }),
    }).then((response) => response.json());

    console.log("[MemberAPICalls] callRegisterAPI RESULT : ", result);

    if (result.status === 201) {
      dispatch({ type: POST_REGISTER, payload: result });
    } else {
      Swal.fire({
        icon: "warning",
        text: "이미 존재하는 아이디입니다. 다른 아이디를 입력하세요.",
      });
    }
  };
};
