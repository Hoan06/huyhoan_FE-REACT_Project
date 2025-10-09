import { useEffect, useState } from "react";
import iconCloseModalCreate from "../assets/icons/icon_close_modal_create.png";
import iconSelect from "../assets/icons/icon_select.png";
import iconSelectSuccess from "../assets/icons/icon_tickerSuccess.png";
import board1 from "../assets/images/board1.jpg";
import board2 from "../assets/images/board2.jpg";
import board3 from "../assets/images/board3.jpg";
import board4 from "../assets/images/board4.jpg";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { updateBoard } from "../api/boardSlice";
import type { Board } from "../utils/Types";
import Swal from "sweetalert2";

interface ModalEditBoardProps {
  board: Board;
  onClose: () => void;
}

export default function ModalEditBoard({
  board,
  onClose,
}: ModalEditBoardProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState(board.title);
  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    board.backdrop && board.backdrop.startsWith("#") ? null : board.backdrop
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    board.color || (board.backdrop?.startsWith("#") ? board.backdrop : null)
  );
  const [hoveredBg, setHoveredBg] = useState<string | null>(null);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  const backgrounds = [board1, board2, board3, board4];
  const colors = [
    "#0079BF",
    "#D29034",
    "#519839",
    "#B04632",
    "#89609E",
    "#CD5A91",
  ];

  useEffect(() => {
    setTitle(board.title);
    setSelectedBackground(
      board.backdrop && board.backdrop.startsWith("#") ? null : board.backdrop
    );
    setSelectedColor(
      board.color || (board.backdrop?.startsWith("#") ? board.backdrop : null)
    );
  }, [board]);

  const handleSelectBackground = (bg: string) => {
    setSelectedBackground(bg);
    setSelectedColor(null);
  };

  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
    setSelectedBackground(null);
  };

  const handleUpdate = async () => {
    if (!title.trim()) {
      setShowError(true);
      return;
    }

    const finalBackdrop = selectedBackground || selectedColor || board1;
    const finalColor = selectedColor || "";

    const updated: Board = {
      ...board,
      title,
      backdrop: finalBackdrop,
      color: finalColor,
    };

    await dispatch(updateBoard(updated));

    Swal.fire({
      icon: "success",
      title: "Cập nhật thành công!",
      showConfirmButton: false,
      timer: 1200,
    });

    onClose();
  };

  return (
    <>
      <div className="overlayModalCreate" onClick={onClose}></div>
      <div className="modalCreateBoard">
        {/* Header */}
        <div className="headerModalCreate">
          <h2 className="textHeaderCreate">Update board</h2>
          <div className="closeModalCreate" onClick={onClose}>
            <img className="btnClose" src={iconCloseModalCreate} alt="close" />
          </div>
        </div>

        {/* Content */}
        <div className="contentCreateBoard">
          {/* Background */}
          <div className="choiceBackgroundCreate">
            <h2 className="textModalBackground">Background</h2>
            <div className="listBackgroundCreate">
              {backgrounds.map((img, idx) => (
                <div
                  className="backgroundCreateInfo"
                  key={idx}
                  onClick={() => handleSelectBackground(img)}
                  onMouseEnter={() => setHoveredBg(img)}
                  onMouseLeave={() => setHoveredBg(null)}
                  style={{ position: "relative" }}
                >
                  <img className="imgBackground" src={img} alt="" />
                  {(selectedBackground === img || hoveredBg === img) && (
                    <img
                      className="selectIconCreate"
                      src={
                        selectedBackground === img
                          ? iconSelectSuccess
                          : iconSelect
                      }
                      alt="select"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lineModalCreate"></div>

          {/* Color */}
          <div className="choiceColorCreate">
            <h2 className="textModalColor">Color</h2>
            <div className="listColorCreate">
              {colors.map((color, idx) => (
                <div
                  className="colorCreateInfo"
                  key={idx}
                  onClick={() => handleSelectColor(color)}
                  onMouseEnter={() => setHoveredColor(color)}
                  onMouseLeave={() => setHoveredColor(null)}
                  style={{ position: "relative" }}
                >
                  <div
                    className="colorBox"
                    style={{
                      backgroundColor: color,
                      width: "100%",
                      height: "40px",
                      borderRadius: "8px",
                    }}
                  ></div>
                  {(selectedColor === color || hoveredColor === color) && (
                    <img
                      className="selectIconCreate"
                      src={
                        selectedColor === color ? iconSelectSuccess : iconSelect
                      }
                      alt="select"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lineModalCreate"></div>

          {/* Title */}
          <div className="boardTitleModal">
            <h2 className="textBoardTitle">
              Board title <span>*</span>
            </h2>
            <input
              className="inputTitle"
              type="text"
              value={title}
              placeholder="E.g. Shopping list for birthday..."
              onChange={(e) => {
                setTitle(e.target.value);
                if (showError && e.target.value.trim()) setShowError(false);
              }}
            />
            {showError && (
              <p className="noticeTitle">
                👋 Please provide a valid board title.
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="footerModalCreate">
          <div className="selectButtonCreate">
            <button className="closeModalCreateFooter" onClick={onClose}>
              Close
            </button>
            <button className="createNewBoard" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
