import noticeStyle from "./NoticeDetail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import {
  callNoticeDetailAPI,
  callNoticeUpdateAPI,
  callNoticeDeleteAPI,
} from "../../apis/NoticeAPIcall";

import LoginModal from "../../components/common/LoginModal";

import { decodeJwt } from "../../utils/tokenUtils";

import NoticeReply from "../notice/NoticeReply";

function NoticeAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const notice = useSelector((state) => state.noticeReducer);
  const noticeDetail = notice;
  console.log("noticeDetail : ", noticeDetail);

  const [loginModal, setLoginModal] = useState(false);
  const [modifyMode, setModifyMode] = useState(false);
  const [form, setForm] = useState({});

  useEffect(
    () => {
      dispatch(
        callNoticeDetailAPI({
          //공지사항 상세 조회
          noticeNo: params.noticeNo,
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
      noticeNo: noticeDetail.noticeNo,
      noticeTitle: noticeDetail.noticeTitle,
      noticeContent: noticeDetail.noticeContent,
    });
  };

  const onClickNoticeUpdateHandler = () => {
    console.log("[NoticeUpdate] onClickNoticeUpdateHandler");

    dispatch(
      callNoticeUpdateAPI({
        noticeNo: params.noticeNo,
        form: form,
      })
    );
    // navigate(`/notices/read-only/${notice.noticeNo}`, { replace: true });
    window.location.reload();

    console.log(form);
  };

  const onClickNoticeDeleteHandler = () => {
    console.log("[NoticeDelete] onClickNoticeDeleteHandler");

    dispatch(
      callNoticeDeleteAPI({
        noticeNo: params.noticeNo,
      })
    );

    // alert("삭제가 완료되었습니다. 메인으로 돌아갑니다.")
    Swal.fire({
      icon: "success",
      text: "삭제가 완료되었습니다. 메인으로 돌아갑니다.",
    });

    navigate(`/`, { replace: true });
    // window.location.reload();

    console.log(form);
  };

  const isLogin = window.localStorage.getItem("accessToken");
  let decoded = null;

  if (isLogin !== undefined && isLogin !== null) {
    const temp = decodeJwt(window.localStorage.getItem("accessToken"));
    decoded = temp.auth[0];
  }
  console.log("decoded ", decoded);

  return (
    <>
      <div className={noticeStyle.cardBody}>
        <h3 className={noticeStyle.siteTitle}>BLUE Island</h3>
        {loginModal ? <LoginModal setLoginModal={setLoginModal} /> : null}
        {NoticeAdmin && (
          <div className={noticeStyle.noticeBody}>
            <div className={noticeStyle.title}>
              <input
                name="noticeTitle"
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
                className={noticeStyle.titleInputBox}
                onChange={onChangeHandler}
                value={
                  (!modifyMode ? notice.noticeTitle : form.noticeTitle) || ""
                }
              />
            </div>
            <div className={noticeStyle.identity}>
              <div className={noticeStyle.memberBox}>
                <label>{notice.memberId}</label>
              </div>
              <div className={noticeStyle.detailBox}>
                <label>조회수</label>
                <label>{notice.noticeCount}</label>
                <label>작성일</label>
                <label>{notice.appendDate}</label>
              </div>
            </div>
            <div className={noticeStyle.description}>
              <div>
                <textarea
                  name="noticeContent"
                  readOnly={modifyMode ? false : true}
                  style={
                    !modifyMode
                      ? null
                      : {
                          backgroundColor: "white",
                          border: "1px solid #dee2e6",
                        }
                  }
                  className={noticeStyle.contentInputBox}
                  onChange={onChangeHandler}
                  value={
                    (!modifyMode
                      ? noticeDetail.noticeContent
                      : form.noticeContent) || ""
                  }
                />
              </div>
            </div>
          </div>
        )}
        <div className={noticeStyle.modifyBox}>
          <button
            className={noticeStyle.modifyBtn}
            onClick={() => navigate(-1)}
          >
            돌아가기
          </button>
          {!modifyMode && decoded === "ROLE_ADMIN" && (
            <>
              <button
                className={noticeStyle.modifyBtn}
                onClick={onClickModifyModeHandler}
              >
                수정하기
              </button>
              <button
                className={noticeStyle.modifyBtn}
                onClick={onClickNoticeDeleteHandler}
              >
                삭제하기
              </button>
            </>
          )}
          {modifyMode && (
            <button
              className={noticeStyle.modifyBtn}
              onClick={onClickNoticeUpdateHandler}
            >
              저장하기
            </button>
          )}
        </div>
      </div>
      {!modifyMode && (
        <>
          <br />
          <div>
            <NoticeReply />
          </div>
        </>
      )}
    </>
  );
}

export default NoticeAdmin;
