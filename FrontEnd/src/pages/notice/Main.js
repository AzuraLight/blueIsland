import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import mainStyle from "./Main.module.css";

import { callNoticeListAPI } from "../../apis/NoticeAPIcall";

function Main() {
  // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notices = useSelector((state) => state.noticeReducer);
  console.log("체크 notices : ", notices);

  const noticeList = notices.data;
  console.log("noticeList : ", noticeList);

  const pageInfo = notices.pageInfo;

  console.log("pageInfo : ", pageInfo);

  // const [start, setStart] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // const [pageEnd, setPageEnd] = useState(1);

  const pageNumber = [];
  if (pageInfo) {
    for (let i = 1; i <= pageInfo.endPage; i++) {
      pageNumber.push(i);
    }
  }

  useEffect(
    () => {
      // setStart((currentPage - 1) * 5);
      dispatch(
        callNoticeListAPI({
          currentPage: currentPage,
        })
      );
    }, // eslint-disable-next-line
    [currentPage]
  );

  const onClickTableTr = (noticeNo) => {
    navigate(`notices/read-only/${noticeNo}`, { replace: false });
  };

  return (
    <>
      <div className={mainStyle.cardBody}>
        <table className="table table-hover table-striped">
          <col width="5%" />
          <col width="60%" />
          <col width="10%" />
          <col width="10%" />
          <col width="15%" />
          <col width="10%" />
          <thead className={mainStyle.tableHead}>
            <tr>
              <th>번호</th>
              <th className={mainStyle.tableTitle}>제목</th>
              <th>작성자</th>
              <th>조회수</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(noticeList) &&
              noticeList.map((notice) => (
                <tr
                  key={notice.noticeNo}
                  className={mainStyle.tableBody}
                  onClick={() => onClickTableTr(notice.noticeNo)}
                >
                  <td>{notice.noticeNo}</td>
                  <td className={mainStyle.tableTitle}>{notice.noticeTitle}</td>
                  <td> {notice.memberId} </td>
                  <td> {notice.noticeCount} </td>
                  <td> {notice.appendDate} </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div
          className={mainStyle.pageBox}
          style={{ listStyleType: "none", display: "flex" }}
        >
          {Array.isArray(noticeList) && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={mainStyle.pagingBtnSide}
            >
              &lt;
            </button>
          )}
          {pageNumber.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
              <button
                style={
                  currentPage === num
                    ? {
                        backgroundColor: "#0d6efd",
                        color: "white",
                        border: "2px solid #0d6efd",
                      }
                    : null
                }
                className={mainStyle.pagingBtn}
              >
                {num}
              </button>
            </li>
          ))}
          {Array.isArray(noticeList) && (
            <button
              className={mainStyle.pagingBtnSide}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage === pageInfo.endPage || pageInfo.total === 0
              }
            >
              &gt;
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Main;
