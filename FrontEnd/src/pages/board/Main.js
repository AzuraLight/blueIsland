import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import mainStyle from "./Main.module.css";

import { callBoardListAPI } from "../../apis/BoardAPIcall";

import { decodeJwt } from "../../utils/tokenUtils";

function Main() {
  // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const boards = useSelector((state) => state.boardReducer);
  console.log("체크 boards : ", boards);
  const notices = useSelector((state) => state.noticeReducer);

  const boardList = boards.data;

  const noticeList = notices.data?.slice(0, 2);

  console.log("noticeList? : ", noticeList);
  const pageInfo = boards.pageInfo;

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
      //           setStart((currentPage - 1) * 5);
      dispatch(
        callBoardListAPI({
          currentPage: currentPage,
        })
      );
    }, // eslint-disable-next-line
    [currentPage]
  );

  // const indexNumber =
  //   pageInfo.totalCount - (currentPage * pageInfo.limit )- pageInfo.endPage;

  const onClickTableTr = (boardNo) => {
    navigate(`boards/read-only/${boardNo}`, { replace: false });
  };

  const onClickTableTrNo = (noticeNo) => {
    navigate(`notices/read-only/${noticeNo}`, { replace: false });
  };

  const onClickBoardInsert = () => {
    console.log("[BoardInsert] onClickBoardInsert");
    navigate("/boards/user-only", { replace: false });
  };

  const isLogin = window.localStorage.getItem("accessToken");
  let decoded = null;

  if (isLogin !== undefined && isLogin !== null) {
    const temp = decodeJwt(window.localStorage.getItem("accessToken"));
    decoded = temp.auth[0];
  }
  console.log("decoded ", decoded);

  // 유저 권한 확인 함수
  const CheckRole = () => {
    if (decoded === "ROLE_USER" || decoded === "ROLE_ADMIN") {
      return true;
    }
  };

  return (
    <>
      <div className={mainStyle.cardBody}>
        <table className="table table-hover table-striped">
          <colgroup>
            <col width="5%" />
            <col width="60%" />
            <col width="10%" />
            <col width="10%" />
            <col width="15%" />
            <col width="10%" />
          </colgroup>
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
                  onClick={() => onClickTableTrNo(notice.noticeNo)}
                  className={mainStyle.tableBody}
                >
                  <td className={mainStyle.notification}> 공지 </td>
                  <td className={mainStyle.tableTitle}>{notice.noticeTitle}</td>
                  <td> {notice.memberId} </td>
                  <td> {notice.noticeCount} </td>
                  <td> {notice.appendDate} </td>
                </tr>
              ))}
            {Array.isArray(boardList) &&
              boardList.map((board) => (
                <tr
                  key={board.boardNo}
                  onClick={() => onClickTableTr(board.boardNo)}
                  className={mainStyle.tableBody}
                >
                  <td className={mainStyle.number}> {board.boardNo} </td>
                  <td className={mainStyle.tableTitle}> {board.boardTitle} </td>
                  <td> {board.memberId} </td>
                  <td> {board.boardCount} </td>
                  <td> {board.appendDate} </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className={mainStyle.writeBox}>
          {CheckRole() === true && (
            <button onClick={onClickBoardInsert} className={mainStyle.writeBtn}>
              글쓰기
            </button>
          )}
        </div>

        <div
          className={mainStyle.pageBox}
          style={{ listStyleType: "none", display: "flex" }}
        >
          {Array.isArray(boardList) && (
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
          {Array.isArray(boardList) && (
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
