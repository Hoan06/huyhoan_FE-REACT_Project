import { CloseCircleOutlined } from "@ant-design/icons";
import "../styles/Board.css";

interface ClosedBoardsProps {
  boards: { img: string; title: string }[];
}

function ClosedBoards({ boards }: ClosedBoardsProps) {
  return (
    <>
      <div className="headerClosed">
        <div className="textHeaderClosed">
          <CloseCircleOutlined className="listContentIcon" />
          <h1 className="textList textListClosed">Closed Boards</h1>
        </div>
      </div>

      <div className="listClosed">
        {boards.map((board, idx) => (
          <div key={idx} className="boardInfoClosed">
            <img className="backgroundBoardClosed" src={board.img} alt="" />
            <div className="overlay"></div>
            <span className="titleBoardClosed">{board.title}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default ClosedBoards;
