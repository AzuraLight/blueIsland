import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import boardStyle from "./BoardReply.module.css";

import {
  callReplyRegistAPI,
  callReplyListAPI,
  callReplyUpdateAPI,
  callReplyDeleteAPI,
} from "../../apis/BoardReplyAPIcall";

import { decodeJwt } from "../../utils/tokenUtils";

function BoardReply() {
  const params = useParams();
  const dispatch = useDispatch();
  const reply = useSelector((state) => state.replyReducer);
  const board = useSelector((state) => state.boardReducer);

  console.log("reply : ", reply);
  // console.log("reply.memberId : ", reply[i].memberId);

  const boardNo = board ? board.boardNo : null;

  const token = decodeJwt(window.localStorage.getItem("accessToken"));
  // console.log(token.sub);

  const [showButton, setShowButton] = useState(false);
  const [modifyMode, setModifyMode] = useState(false);

  const [form, setForm] = useState({
    memberId: token?.sub,
    replyContent: "",
  });

  // console.log("params.boardNo : ", params.boardNo);

  // const i = 0;
  // const insertMember = reply.memberId;

  useEffect(
    () => {
      dispatch(
        callReplyListAPI({
          boardNo: params.boardNo,
        })
      );
    }, // eslint-disable-next-line
    []
  );

  // Textarea 클릭 함수
  const onTextareaClick = () => {
    setShowButton(true);
  };

  // form 데이터 세팅
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    // console.log("form : ", form);
  };

  const onReplyChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    // console.log("Replyform : ", form);
  };

  const isLogin = window.localStorage.getItem("accessToken");

  let decoded = null;
  let decodedUser = null;

  if (isLogin !== undefined && isLogin !== null) {
    const temp = decodeJwt(window.localStorage.getItem("accessToken"));
    decoded = temp.auth[0];
    decodedUser = temp.sub;
  }

  // console.log("decodedUser : ", decodedUser);

  // 유저 권한 확인 함수
  const CheckRole = () => {
    if (decoded === "ROLE_USER" || decoded === "ROLE_ADMIN") {
      return true;
    } else {
      return false;
    }
  };

  // console.log("insertMember : ", insertMember);

  //유저 아이디 확인 함수
  const CheckId = (memberId) => {
    if (decodedUser === memberId || decodedUser === "admin") {
      return true;
    } else if (!decodedUser) {
      return false; // 로그인하지 않은 경우 권한 없음
    } else {
      return false; // 로그인한 사용자와 작성자 ID가 다른 경우 권한 없음
    }
  };

  // reply 배열에서 작성자와 함께 인덱스 추출하여 배열로 만듦
  const insertMembers = reply.map((r, i) => ({
    memberId: r.memberId,
    index: i,
  }));

  // 각 댓글의 작성자 ID와 함께 CheckId 함수를 호출하여 결과를 저장하는 새로운 배열 생성
  const checkResults = insertMembers.map(({ memberId, index }) => {
    // console.log(`작성자 ${index + 1}: ${memberId}`);
    return CheckId(memberId);
  });

  const onClickReplyRegistHandler = () => {
    console.log("[ReplyRegist] onClickReplyRegistHandler");
    dispatch(
      callReplyRegistAPI({
        form: form,
        boardNo: boardNo,
      })
    );
    // console.log("form", form);

    Swal.fire({
      icon: "success",
      text: "등록되었습니다.",
    });
    window.location.reload();
  };

  const onClickModifyModeHandler = (replyNo) => {
    // 수정모드
    const replyToModify = reply.find((r) => r.replyNo === replyNo);
    const { memberId } = replyToModify;

    if (CheckId(memberId) === false) {
      Swal.fire({
        icon: "warning",
        text: "권한이 없습니다.",
      });
      return;
    }
    setModifyMode({
      ...modifyMode,
      [replyNo]: true,
    });
    setForm({
      ...form,
      replyNo: replyNo,
      boardNo: params.boardNo,
    });
  };

  const onClickReplyUpdateHandler = (replyNo) => {
    console.log("[ReplyUpdate] onClickReplyUpdateHandler");

    const replyToUpdate = reply.find((r) => r.replyNo === replyNo);
    const { memberId } = replyToUpdate;

    if (CheckId(memberId) === false) {
      Swal.fire({
        icon: "warning",
        text: "권한이 없습니다.",
      });
      return;
    }
    dispatch(
      callReplyUpdateAPI({
        form: form,
        boardNo: params.boardNo,
        replyNo: replyNo,
      })
    );
    setModifyMode({
      ...modifyMode,
      [replyNo]: false,
    });
    window.location.reload();
  };

  const onClickReplyDeleteHandler = (replyNo) => {
    console.log("[ReplyDelete] onClickReplyDeleteHandler");

    const replyToDelete = reply.find((r) => r.replyNo === replyNo);
    const { memberId } = replyToDelete;

    if (CheckId(memberId) === false) {
      Swal.fire({
        icon: "warning",
        text: "권한이 없습니다.",
      });
      return;
    }
    dispatch(
      callReplyDeleteAPI({
        boardNo: params.boardNo,
        replyNo: replyNo,
      })
    );

    Swal.fire({
      icon: "success",
      text: "삭제가 완료되었습니다.",
    });

    window.location.reload();

    console.log(form);
  };

  return (
    <div className={boardStyle.cardBody}>
      <>
        {CheckRole() && (
          <div className={boardStyle.replyBox}>
            <div className={boardStyle.replyHeader}>
              <span> 댓글 작성 </span>
              <span className={boardStyle.currentUser}>{decodedUser}</span>
            </div>
            <div className={boardStyle.content}>
              <label>
                <textarea
                  type="text"
                  className={boardStyle.replyInput}
                  placeholder="댓글달기"
                  onClick={onTextareaClick}
                  onChange={onChangeHandler}
                  name="replyContent"
                />
                {showButton && (
                  <button
                    className={boardStyle.insertButton}
                    onClick={onClickReplyRegistHandler}
                  >
                    등록
                  </button>
                )}
              </label>
            </div>
          </div>
        )}
        {Array.isArray(reply) &&
          reply.map((reply) => (
            <div className={boardStyle.replyBody} key={reply.replyNo}>
              <div className={boardStyle.replyHugBody}>
                <div className={boardStyle.replyContentHeader}>
                  <span>{reply.memberId}</span>
                  <span className={boardStyle.replyDate}>
                    {reply.appendDate}
                  </span>
                </div>
                <div className={boardStyle.buttonBox}>
                  {modifyMode[reply.replyNo] && CheckRole() ? (
                    <button
                      onClick={() => onClickReplyUpdateHandler(reply.replyNo)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                      <span> 저장</span>
                    </button>
                  ) : (
                    !modifyMode[reply.replyNo] && (
                      <button
                        onClick={() => onClickModifyModeHandler(reply.replyNo)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                        <span> 수정</span>
                      </button>
                    )
                  )}
                  {!modifyMode[reply.replyNo] && (
                    <button
                      onClick={() => onClickReplyDeleteHandler(reply.replyNo)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash3"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                      </svg>
                      <span> 삭제</span>
                    </button>
                  )}
                </div>
              </div>
              {modifyMode[reply.replyNo] ? (
                <div className={boardStyle.replyContentBody}>
                  <textarea
                    name="replyContent"
                    placeholder="내용을 입력하세요."
                    onChange={onReplyChangeHandler}
                    value={form.replyContent || ""}
                  />
                </div>
              ) : (
                <div className={boardStyle.replyContentBody}>
                  {reply.replyContent}
                </div>
              )}
            </div>
          ))}
      </>
      {/* )} */}
    </div>
  );
}

export default BoardReply;
