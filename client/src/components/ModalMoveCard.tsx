import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { updateTask } from "../api/taskSlice";
import Swal from "sweetalert2";

interface ModalMoveCardProps {
  onClose: () => void;
  currentBoardId: number;
  selectedTaskId: number;
}

export default function ModalMoveCard({
  onClose,
  currentBoardId,
  selectedTaskId,
}: ModalMoveCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { boards } = useSelector((state: RootState) => state.board);
  const { lists } = useSelector((state: RootState) => state.list);
  const { tasks } = useSelector((state: RootState) => state.task);

  const currentBoard = boards.find((b) => b.id === currentBoardId);
  const boardLists = lists.filter((l) => l.board_id === currentBoardId);
  const task = tasks.find((t) => t.id === selectedTaskId);

  const [selectedListId, setSelectedListId] = useState<number>(
    task?.list_id || boardLists[0]?.id
  );

  const handleMove = async () => {
    if (!task) return;
    if (task.list_id === selectedListId) {
      Swal.fire("No change", "This card is already in that list.", "info");
      return;
    }

    await dispatch(updateTask({ ...task, list_id: selectedListId }));

    Swal.fire({
      title: "Moved!",
      text: "Card has been moved successfully.",
      icon: "success",
      timer: 1200,
      showConfirmButton: false,
    });
    onClose();
  };

  return (
    <div className="overlayMoveCard" onClick={onClose}>
      <div className="modalMoveCard" onClick={(e) => e.stopPropagation()}>
        <div className="headerMoveCard">
          <h3>Move card</h3>
          <span className="closeBtn" onClick={onClose}>
            ✕
          </span>
        </div>

        <p className="subTitle">Select destination</p>

        <div className="formGroup">
          <label>Board</label>
          <input
            type="text"
            value={currentBoard?.title || ""}
            readOnly
            className="inputMove"
          />
        </div>

        <div className="rowGroup">
          <div className="formGroup half">
            <label>List</label>
            <select
              className="inputMove"
              value={selectedListId}
              onChange={(e) => setSelectedListId(Number(e.target.value))}
            >
              {boardLists.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.title}
                </option>
              ))}
            </select>
          </div>

          <div className="formGroup half">
            <label>Position</label>
            <select className="inputMove" disabled>
              <option>1</option>
            </select>
          </div>
        </div>

        <div className="footerMoveCard">
          <button className="btnMove" onClick={handleMove}>
            Move
          </button>
        </div>
      </div>
    </div>
  );
}
