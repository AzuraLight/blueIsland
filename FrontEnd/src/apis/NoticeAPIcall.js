import {
  GET_NOTICE,
  GET_NOTICES,
  POST_NOTICE,
  PUT_NOTICE,
  DELETE_NOTICE,
} from "../modules/NoticeModule.js";

// 공지사항 등록 함수
export const callNoticeRegistAPI = ({ form }) => {
  console.log("[NoticeAPICalls] callNoticeRegistAPI Call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/notices/admin-only`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        memberId: form.memberId,
        noticeTitle: form.noticeTitle,
        noticeContent: form.noticeContent,
      }),
    }).then((response) => response.json());

    console.log("[NoticeAPICalls] callNoticeRegistAPI RESULT : ", result);

    dispatch({ type: POST_NOTICE, payload: result });
  };
};

// 공지사항 수정 함수
export const callNoticeUpdateAPI = ({ form, noticeNo }) => {
  console.log("[NoticeAPICalls] callNoticeUpdateAPI Call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/notices/admin-only/${noticeNo}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        noticeNo: form.noticeNo,
        noticeTitle: form.noticeTitle,
        noticeContent: form.noticeContent,
      }),
    }).then((response) => response.json());

    console.log("[NoticeAPICalls] callNoticeUpdateAPI RESULT : ", result);

    dispatch({ type: PUT_NOTICE, payload: result });
  };
};

// 공지사항 상세보기 함수
export const callNoticeDetailAPI = ({ noticeNo }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/notices/read-only/${noticeNo}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    }).then((response) => response.json());

    console.log("[NoticeAPICalls] callNoticeDetailAPI RESULT : ", result);
    if (result.status === 200) {
      console.log("[NoticeAPICalls] callNoticeDetailAPI SUCCESS");
      dispatch({ type: GET_NOTICE, payload: result.data });
    }
  };
};

// 공지사항 전체 조회 함수
export const callNoticeListAPI = ({ currentPage }) => {
  let requestURL;

  if (currentPage !== undefined || currentPage !== null) {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/notices/read-only/?offset=${currentPage}`;
  } else {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/notices/read-only`;
  }

  console.log("[NoticeAPICalls] requestURL : ", requestURL);

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    }).then((response) => response.json());
    if (result.status === 200) {
      console.log("[NoticeAPICalls] callNoticeListAPI RESULT : ", result);
      // console.log("체크?");
      dispatch({ type: GET_NOTICES, payload: result.data });
    }
  };
};

// 공지사항 삭제 함수
export const callNoticeDeleteAPI = ({ noticeNo }) => {
  console.log("[NoticeAPICalls] callNoticeDeleteAPI Call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/notices/admin-only/${noticeNo}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[NoticeAPICalls] callNoticeDeleteAPI RESULT : ", result);

    dispatch({ type: DELETE_NOTICE, payload: result });
  };
};
