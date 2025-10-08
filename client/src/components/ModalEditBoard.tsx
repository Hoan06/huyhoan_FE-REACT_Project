import { useEffect, useState } from "react";
import iconCloseModalCreate from "../assets/icons/icon_close_modal_create.png";
import iconSelect from "../assets/icons/icon_select.png";
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
  const [selectedBackground, setSelectedBackground] = useState(board.backdrop);
  const [selectedColor, setSelectedColor] = useState(board.color || "");
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    setTitle(board.title);
    setSelectedBackground(board.backdrop);
    setSelectedColor(board.color || "");
  }, [board]);

  const handleUpdate = async () => {
    if (!title.trim()) {
      setShowError(true);
      return;
    }

    const updated: Board = {
      ...board,
      title,
      backdrop: selectedBackground,
      color: selectedColor,
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

  const listBackgrounds = [board1, board2, board3, board4];
  const colorClasses = [
    "color1",
    "color2",
    "color3",
    "color4",
    "color5",
    "color6",
  ];

  return (
    <>
      <div className="overlayModalCreate" onClick={onClose}></div>
      <div className="modalCreateBoard">
        <div className="headerModalCreate">
          <h2 className="textHeaderCreate">Update board</h2>
          <div className="closeModalCreate" onClick={onClose}>
            <img className="btnClose" src={iconCloseModalCreate} alt="" />
          </div>
        </div>

        <div className="contentCreateBoard">
          {/* Background */}
          <div className="choiceBackgroundCreate">
            <h2 className="textModalBackground">Background</h2>
            <div className="listBackgroundCreate">
              {listBackgrounds.map((img, idx) => (
                <div
                  className="backgroundCreateInfo"
                  key={idx}
                  onClick={() => setSelectedBackground(img)}
                >
                  <img className="imgBackground" src={img} alt="" />
                  {selectedBackground === img && (
                    <img className="selectIconCreate" src={iconSelect} alt="" />
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
              {colorClasses.map((colorClass, idx) => (
                <div
                  className="colorCreateInfo"
                  key={idx}
                  onClick={() => setSelectedColor(colorClass)}
                >
                  <div className={colorClass}></div>
                  {selectedColor === colorClass && (
                    <img className="selectIconCreate" src={iconSelect} alt="" />
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
