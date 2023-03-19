import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { callBoardRegistAPI } from "../../apis/BoardAPIcall";
import { decodeJwt } from "../../utils/tokenUtils";
import registStyle from "./BoardRegist.module.css";

function BoardRegist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const board = useSelector((state) => state.boardReducer).data;

  const token = decodeJwt(window.localStorage.getItem("accessToken"));
  console.log(token.sub);

  const [form, setForm] = useState({
    memberId: token.sub,
    boardTitle: "",
    boardContent: "",
  });

  useEffect(
    () => {
      if (board.status === 200) {
        console.log(board);
      }
    }, // eslint-disable-next-line
    [board]
  );

  // form 데이터 세팅
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onClickBoardRegistHandler = () => {
    console.log("[BoardRegist] onClickBoardRegistHandler");

    dispatch(
      callBoardRegistAPI({
        form: form,
      })
    );
    console.log("form", form);
    alert("리스트로 이동합니다.");

    navigate("/", { replace: true });
    // window.location.reload();
  };
  return (
    <div className={registStyle.cardBody}>
      <h3 className={registStyle.siteTitle}>BLUE Island</h3>
      <div className={registStyle.noticeBody}>
        <div className={registStyle.title}>
          <input
            name="boardTitle"
            className={registStyle.titleInputBox}
            onChange={onChangeHandler}
          />
          <label>제목</label>
        </div>
        <div className={registStyle.contents}>
          <textarea
            name="boardContent"
            className={registStyle.contentInputBox}
            onChange={onChangeHandler}
          />
          <label className={registStyle.contentLabel}>
            작성 할 내용을 입력하세요.
          </label>
        </div>
      </div>
      <div className={registStyle.registBox}>
        <button onClick={() => navigate(-1)} className={registStyle.registBtn}>
          돌아가기
        </button>
        <button
          onClick={onClickBoardRegistHandler}
          className={registStyle.registBtn}
        >
          등록
        </button>
      </div>
    </div>
  );
}

export default BoardRegist;
