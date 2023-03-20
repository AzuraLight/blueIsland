import {
  GET_BOARD,
  GET_BOARDS,
  POST_BOARD,
  PUT_BOARD,
} from "../modules/BoardModule.js";

// 게시판 등록 함수
export const callBoardRegistAPI = ({ form }) => {
  console.log("[BoardAPICalls] callBoardRegistAPI Call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/boards/user-only`;

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
        boardTitle: form.boardTitle,
        boardContent: form.boardContent,
      }),
    }).then((response) => response.json());

    console.log("[BoardAPICalls] callBoardRegistAPI RESULT : ", result);

    dispatch({ type: POST_BOARD, payload: result });
  };
};

// 게시판 수정 함수
export const callBoardUpdateAPI = ({ form, boardNo }) => {
  console.log("[BoardAPICalls] callBoardUpdateAPI Call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/boards/user-only/${boardNo}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        boardNo: form.boardNo,
        boardTitle: form.boardTitle,
        boardContent: form.boardContent,
      }),
    }).then((response) => response.json());

    console.log("[BoardAPICalls] callBoardUpdateAPI RESULT : ", result);

    dispatch({ type: PUT_BOARD, payload: result });
  };
};

// 게시판 상세보기 함수
export const callBoardDetailAPI = ({ boardNo }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/boards/read-only/${boardNo}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    }).then((response) => response.json());

    console.log("[BoardAPICalls] callBoardDetailAPI RESULT : ", result);
    if (result.status === 200) {
      console.log("[BoardAPICalls] callBoardDetailAPI SUCCESS");
      dispatch({ type: GET_BOARD, payload: result.data });
    }
  };
};

// 게시판 전체 조회 함수
export const callBoardListAPI = ({ currentPage }) => {
  let requestURL;

  if (currentPage !== undefined || currentPage !== null) {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/boards/read-only/?offset=${currentPage}`;
  } else {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/boards/read-only`;
  }

  console.log("[BoardAPICalls] requestURL : ", requestURL);

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    }).then((response) => response.json());
    if (result.status === 200) {
      console.log("[BoardAPICalls] callBoardListAPI RESULT : ", result);
      // console.log("체크?");
      dispatch({ type: GET_BOARDS, payload: result.data });
    }
  };
};

// 게시판 삭제 함수
export const callBoardDeleteAPI = ({ boardNo }) => {
  console.log("[BoardAPICalls] callBoardUpdateAPI Call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/boards/user-only/${boardNo}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[BoardAPICalls] callBoardUpdateAPI RESULT : ", result);

    dispatch({ type: PUT_BOARD, payload: result });
  };
};
