import "../styles/Board.css";
import iconStars from "../assets/icons/icon_title_stars.png";

interface StarredBoardItem {
  id: number;
  img: string;
  title: string;
  isColor?: boolean;
}

interface StarredBoardsProps {
  boards: StarredBoardItem[];
}

function StarredBoard({ boards }: StarredBoardsProps) {
  return (
    <>
      <div className="headerClosed">
        <div className="textHeaderClosed">
          <img src={iconStars} alt="" className="listContentIcon" />
          <h1 className="textList textListClosed">Starred Boards</h1>
        </div>
      </div>

      <div className="listClosed">
        {boards.map((board) => (
          <div key={board.id} className="boardInfoClosed">
            {board.isColor ? (
              <div
                className="backgroundBoardClosed"
                style={{ backgroundColor: board.img }}
              ></div>
            ) : (
              <img
                className="backgroundBoardClosed"
                src={board.img}
                alt={board.title}
              />
            )}
            <div className="overlay"></div>
            <span className="titleBoardClosed">{board.title}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default StarredBoard;
