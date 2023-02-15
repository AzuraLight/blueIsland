import { useNavigate } from "react-router-dom";

function Notice({ notice: { noticeNo, noticeTitle, noticeContent } }) {
  const navigate = useNavigate();

  const onClickNoticeHandler = (noticeNo) => {
    navigate(`/admin-only/${noticeNo}`, { replace: false });
  };

  return (
    <div onClick={() => onClickNoticeHandler(noticeNo)}>
      <h5>{noticeTitle}</h5>
      <h5>{noticeContent}</h5>
    </div>
  );
}

export default Notice;
