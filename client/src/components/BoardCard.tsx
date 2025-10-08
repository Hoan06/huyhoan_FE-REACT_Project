import { useState } from "react";
import "../styles/Board.css";
import iconEditBoard from "../assets/icons/icon_edit_board.png";

interface BoardCardProps {
  id: number;
  title: string;
  img: string;
  onClick: (id: number) => void;
  onEdit?: () => void;
}

function BoardCard({ id, title, img, onClick, onEdit }: BoardCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="boardInfo"
      onMouseEnter={() => setIsHovered(true)}
      onClick={() => onClick(id)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: "relative" }}
    >
      <img className="backgroundBoard" src={img} alt={title} />
      <div className="overlay"></div>
      <span className="titleBoard">{title}</span>

      {isHovered && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (onEdit) {
              onEdit();
            }
          }}
          className="editBoard"
          style={{ display: "flex" }}
        >
          <img src={iconEditBoard} alt="edit" />
          <span className="textEdit">Edit this board</span>
        </div>
      )}
    </div>
  );
}

export default BoardCard;
