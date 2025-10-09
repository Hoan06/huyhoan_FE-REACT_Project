import { CloseCircleOutlined } from "@ant-design/icons";
import "../styles/Board.css";

interface BoardItem {
  id: number;
  title: string;
  backdrop: string;
  color?: string;
  is_close?: boolean;
  is_starred?: boolean;
}

interface ClosedBoardsProps {
  boards: BoardItem[];
}

function ClosedBoards({ boards }: ClosedBoardsProps) {
  const closedBoards = boards.filter((board) => board.is_close === true);

  return (
    <>
      <div className="headerClosed">
        <div className="textHeaderClosed">
          <CloseCircleOutlined className="listContentIcon" />
          <h1 className="textList textListClosed">Closed Boards</h1>
        </div>
      </div>

      <div className="listClosed">
        {closedBoards.map((board) => (
          <div key={board.id} className="boardInfoClosed">
            {board.backdrop.startsWith("#") ? (
              <div
                className="backgroundBoardClosed"
                style={{
                  backgroundColor: board.backdrop,
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                }}
              ></div>
            ) : (
              <img
                className="backgroundBoardClosed"
                src={board.backdrop}
                alt={board.title}
              />
            )}

            <div className="overlay"></div>
            <span className="titleBoardClosed">{board.title}</span>
          </div>
        ))}

        {closedBoards.length === 0 && (
          <p className="noClosedBoard">No closed boards found.</p>
        )}
      </div>
    </>
  );
}

export default ClosedBoards;
