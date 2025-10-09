import { useEffect, useState } from "react";
import iconCloseModalCreate from "../assets/icons/icon_close_modal_create.png";
import iconSelect from "../assets/icons/icon_select.png";
import iconSelectSuccess from "../assets/icons/icon_tickerSuccess.png";
import board1 from "../assets/images/board1.jpg";
import board2 from "../assets/images/board2.jpg";
import board3 from "../assets/images/board3.jpg";
import board4 from "../assets/images/board4.jpg";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { fetchUser } from "../api/userSlice";
import { addBoard } from "../api/boardSlice";
import Swal from "sweetalert2";

interface ModalCreateBoardProps {
  onClose: () => void;
}

export default function ModalCreateBoard({ onClose }: ModalCreateBoardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  const [hoveredBg, setHoveredBg] = useState<string | null>(null);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [selectedBg, setSelectedBg] = useState<string | null>(board1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

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
    dispatch(fetchUser());
  }, [dispatch]);

  const handleSelectBg = (bg: string) => {
    setSelectedBg(bg);
    setSelectedColor(null);
  };

  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
    setSelectedBg(null);
  };

  const handleCreate = async () => {
    if (!title.trim()) {
      setTitleError(true);
      return;
    }

    let finalBackdrop = selectedBg || board1;
    const finalColor = selectedColor || "#0079BF";

    if (selectedColor) {
      finalBackdrop = selectedColor;
    }

    const newBoard = {
      user_id: user?.id,
      title,
      description: "",
      backdrop: finalBackdrop,
      is_starred: false,
      is_close: false,
      created_at: new Date().toISOString(),
      color: finalColor,
    };

    await dispatch(addBoard(newBoard));

    Swal.fire({
      icon: "success",
      title: "Tạo board thành công!",
      showConfirmButton: false,
      timer: 1200,
    });

    onClose();
  };

  return (
    <>
      <div className="overlayModalCreate" onClick={onClose}></div>
      <div className="modalCreateBoard">
        <div className="headerModalCreate">
          <h2 className="textHeaderCreate">Create board</h2>
          <div className="closeModalCreate" onClick={onClose}>
            <img className="btnClose" src={iconCloseModalCreate} alt="" />
          </div>
        </div>

        <div className="contentCreateBoard">
          {/* Background */}
          <div className="choiceBackgroundCreate">
            <h2 className="textModalBackground">Background</h2>
            <div className="listBackgroundCreate">
              {backgrounds.map((img, idx) => (
                <div
                  className="backgroundCreateInfo"
                  key={idx}
                  onClick={() => handleSelectBg(img)}
                  onMouseEnter={() => setHoveredBg(img)}
                  onMouseLeave={() => setHoveredBg(null)}
                  style={{ position: "relative" }}
                >
                  <img className="imgBackground" src={img} alt="" />
                  {(selectedBg === img || hoveredBg === img) && (
                    <img
                      className="selectIconCreate"
                      src={selectedBg === img ? iconSelectSuccess : iconSelect}
                      alt=""
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
                      alt=""
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
              placeholder="E.g. Shopping list for birthday..."
              onChange={(e) => setTitle(e.target.value)}
            />
            {titleError && (
              <p className="noticeTitle showError">
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
            <button className="createNewBoard" onClick={handleCreate}>
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
