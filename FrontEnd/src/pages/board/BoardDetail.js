import boardStyle from "./BoardDetail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {
  callBoardDetailAPI,
  callBoardUpdateAPI,
  callBoardDeleteAPI,
} from "../../apis/BoardAPIcall";
import LoginModal from "../../components/common/LoginModal";

import { decodeJwt } from "../../utils/tokenUtils";

function BoardDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const board = useSelector((state) => state.boardReducer);
  const boardDetail = board;
  const insertMember = boardDetail.memberId;

  const [loginModal, setLoginModal] = useState(false);
  const [modifyMode, setModifyMode] = useState(false);
  const [form, setForm] = useState({});

  useEffect(
    () => {
      dispatch(
        callBoardDetailAPI({
          //게시판 상세 조회
          boardNo: params.boardNo,
        })
      );
    }, // eslint-disable-next-line
    []
  );

  // form 데이터 세팅
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log("form : ", form);
  };

  const onClickModifyModeHandler = () => {
    // 수정모드
    setModifyMode(true);
    setForm({
      boardNo: boardDetail.boardNo,
      boardTitle: boardDetail.boardTitle,
      boardContent: boardDetail.boardContent,
    });
  };

  const onClickBoardUpdateHandler = () => {
    console.log("[BoardUpdate] onClickBoardUpdateHandler");

    dispatch(
      callBoardUpdateAPI({
        boardNo: params.boardNo,
        form: form,
      })
    );

    window.location.reload();

    console.log(form);
  };

  const onClickBoardDeleteHandler = () => {
    console.log("[BoardDelete] onClickBoardDeleteHandler");

    dispatch(
      callBoardDeleteAPI({
        boardNo: params.boardNo,
      })
    );

    Swal.fire({
      icon: "success",
      text: "삭제가 완료되었습니다. 메인으로 돌아갑니다.",
    });
    // alert("삭제가 완료되었습니다. 메인으로 돌아갑니다.");

    navigate(`/`, { replace: true });
    // window.location.reload();

    console.log(form);
  };

  const isLogin = window.localStorage.getItem("accessToken");
  let decoded = null;
  let decodedUser = null;

  if (isLogin !== undefined && isLogin !== null) {
    const temp = decodeJwt(window.localStorage.getItem("accessToken"));
    decoded = temp.auth[0];
    decodedUser = temp.sub;
  }
  console.log("decoded ", decoded);
  console.log("insertMember", insertMember);
  console.log("decodedUser", decodedUser);

  // 유저 권한 확인 함수
  const CheckRole = () => {
    if (decoded === "ROLE_USER" || decoded === "ROLE_ADMIN") {
      return true;
    }
  };

  //유저 아이디 확인 함수
  const CheckId = () => {
    if (decodedUser === insertMember || decodedUser === "admin") {
      return true;
    }
  };

  return (
    <div className={boardStyle.cardBody}>
      <h3 className={boardStyle.siteTitle}>BLUE Island</h3>

      {loginModal ? <LoginModal setLoginModal={setLoginModal} /> : null}

      <div className={boardStyle.boardBody}>
        <div className={boardStyle.title}>
          <input
            name="boardTitle"
            placeholder="제목"
            readOnly={modifyMode ? false : true}
            style={
              !modifyMode
                ? null
                : {
                    backgroundColor: "white",
                    border: "1px solid #33333389",
                  }
            }
            className={boardStyle.titleInputBox}
            onChange={onChangeHandler}
            value={(!modifyMode ? board.boardTitle : form.boardTitle) || ""}
          />
        </div>
        <div className={boardStyle.identity}>
          <div className={boardStyle.memberBox}>
            <label>{board.memberId}</label>
          </div>
          <div className={boardStyle.detailBox}>
            <label>조회수</label>
            <label>{board.boardCount}</label>
            <label>작성일</label>
            <label>{board.appendDate}</label>
          </div>
        </div>
        <div className={boardStyle.description}>
          <div>
            <textarea
              name="boardContent"
              readOnly={modifyMode ? false : true}
              style={
                !modifyMode
                  ? null
                  : {
                      backgroundColor: "white",
                      border: "1px solid #dee2e6",
                    }
              }
              className={boardStyle.contentInputBox}
              onChange={onChangeHandler}
              value={
                (!modifyMode ? boardDetail.boardContent : form.boardContent) ||
                ""
              }
            />
          </div>
        </div>
      </div>
      <div className={boardStyle.modifyBox}>
        <button className={boardStyle.modifyBtn} onClick={() => navigate(-1)}>
          돌아가기
        </button>
        {!modifyMode && CheckRole() === true && CheckId() === true && (
          <>
            <button
              className={boardStyle.modifyBtn}
              onClick={onClickModifyModeHandler}
            >
              수정하기
            </button>
            <button
              className={boardStyle.modifyBtn}
              onClick={onClickBoardDeleteHandler}
            >
              삭제하기
            </button>
          </>
        )}
        {modifyMode && CheckRole() === true && (
          <button
            className={boardStyle.modifyBtn}
            onClick={onClickBoardUpdateHandler}
          >
            저장하기
          </button>
        )}
      </div>
    </div>
  );
}

export default BoardDetail;
