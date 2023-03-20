import {
  GET_REPLIES,
  POST_REPLIES,
  PUT_REPLIES,
  DELETE_REPLIES,
} from "../modules/ReplyModule.js";

// 댓글 등록 함수
export const callReplyRegistAPI = ({ form, boardNo, noticeNo }) => {
  console.log("[ReplyAPICalls] callReplyRegistAPI Call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/boards/replies/user-only`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        replyNo: form.replyNo,
        boardNo: boardNo,
        memberId: form.memberId,
        replyContent: form.replyContent,
      }),
    }).then((response) => response.json());

    console.log("[BoardAPICalls] callReplyRegistAPI RESULT : ", result);

    dispatch({ type: POST_REPLIES, payload: result });
  };
};

// 댓글 전체 조회 함수
export const callReplyListAPI = ({ boardNo, memberId }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/boards/replies/read-only/${boardNo}`;

  console.log("[ReplyAPICalls] requestURL : ", requestURL);

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    }).then((response) => response.json());
    if (result.status === 200) {
      console.log("[ReplyAPICalls] callReplyListAPI RESULT : ", result);
      // console.log("체크?");
      dispatch({ type: GET_REPLIES, payload: result.data });
    }
  };
};

// 댓글 수정 함수
export const callReplyUpdateAPI = ({ form, replyNo, boardNo }) => {
  console.log("[ReplyAPICalls] callReplyUpdateAPI Call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/boards/replies/user-only/${boardNo}/${replyNo}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        boardNo: boardNo,
        replyNo: replyNo,
        replyContent: form.replyContent,
      }),
    }).then((response) => response.json());

    console.log("[ReplyAPICalls] callReplyUpdateAPI RESULT : ", result);

    dispatch({ type: PUT_REPLIES, payload: result });
  };
};

// 댓글 삭제 함수
export const callReplyDeleteAPI = ({ boardNo, replyNo }) => {
  console.log("[ReplyAPICalls] callReplyDeleteAPI Call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/boards/replies/user-only/${boardNo}/${replyNo}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[ReplyAPICalls] callBoardUpdateAPI RESULT : ", result);

    dispatch({ type: DELETE_REPLIES, payload: result });
  };
};
