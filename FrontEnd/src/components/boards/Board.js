import { useNavigate } from "react-router-dom";

function Board({ board: { boardNo, boardTitle, boardContent } }) {
  const navigate = useNavigate();

  const onClickBoardHandler = (boardNo) => {
    navigate(`/user-only/${boardNo}`, { replace: false });
  };

  return (
    <div onClick={() => onClickBoardHandler(boardNo)}>
      <h5>{boardTitle}</h5>
      <h5>{boardContent}</h5>
    </div>
  );
}

export default Board;
