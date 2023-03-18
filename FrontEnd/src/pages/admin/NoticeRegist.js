import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { callNoticeRegistAPI } from "../../apis/NoticeAPIcall";
import { decodeJwt } from "../../utils/tokenUtils";
import registStyle from "./NoticeRegist.module.css";
import Swal from "sweetalert2";

function NoticeRegist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notice = useSelector((state) => state.noticeReducer).data;

  const token = decodeJwt(window.localStorage.getItem("accessToken"));
  console.log(token.sub);

  const [form, setForm] = useState({
    memberId: token.sub,
    noticeTitle: "",
    noticeContent: "",
  });

  useEffect(
    () => {
      if (notice?.status === 200) {
        console.log(notice);
      }
    }, // eslint-disable-next-line
    [notice]
  );

  // form 데이터 세팅
  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onClickNoticeRegistHandler = () => {
    console.log("[NoticeRegist] onClickNoticeRegistHandler");

    dispatch(
      callNoticeRegistAPI({
        form: form,
      })
    );
    console.log("form", form);
    // alert("리스트로 이동합니다.");
    Swal.fire({
      icon: "success",
      text: "등록되었습니다. 메인으로 이동합니다.",
    });

    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <div className={registStyle.cardBody}>
      <h3 className={registStyle.siteTitle}>BLUE Island</h3>
      <div className={registStyle.noticeBody}>
        <div className={registStyle.title}>
          <input
            name="noticeTitle"
            className={registStyle.titleInputBox}
            onChange={onChangeHandler}
            required="true"
          />
          <label>공지사항 제목</label>
        </div>
        <div className={registStyle.contents}>
          <textarea
            name="noticeContent"
            className={registStyle.contentInputBox}
            onChange={onChangeHandler}
          />
          <label className={registStyle.contentLabel}>
            게시 할 공지사항 내용을 입력하세요.
          </label>
        </div>
      </div>
      <div className={registStyle.registBox}>
        <button onClick={() => navigate(-1)} className={registStyle.registBtn}>
          돌아가기
        </button>
        <button
          onClick={onClickNoticeRegistHandler}
          className={registStyle.registBtn}
        >
          공지 등록
        </button>
      </div>
    </div>
  );
}

export default NoticeRegist;
