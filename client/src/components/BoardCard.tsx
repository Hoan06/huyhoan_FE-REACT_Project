import { useState } from "react";
import "../styles/Board.css";
import iconEditBoard from "../assets/icons/icon_edit_board.png";

interface BoardCardProps {
  title: string;
  img: string;
  onEdit?: () => void;
}

function BoardCard({ title, img, onEdit }: BoardCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="boardInfo"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: "relative" }}
    >
      <img className="backgroundBoard" src={img} alt={title} />
      <div className="overlay"></div>
      <span className="titleBoard">{title}</span>

      {isHovered && (
        <div onClick={onEdit} className="editBoard" style={{ display: "flex" }}>
          <img src={iconEditBoard} alt="edit" />
          <span className="textEdit">Edit this board</span>
        </div>
      )}
    </div>
  );
}

export default BoardCard;
