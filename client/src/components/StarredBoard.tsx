import "../styles/Board.css";
import iconStars from "../assets/icons/icon_title_stars.png";

interface ClosedBoardsProps {
  boards: { img: string; title: string }[];
}

function StarredBoard({ boards }: ClosedBoardsProps) {
  return (
    <>
      <div className="headerClosed">
        <div className="textHeaderClosed">
          <img src={iconStars} alt="" className="listContentIcon" />
          <h1 className="textList textListClosed">Starred Boards</h1>
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

export default StarredBoard;
