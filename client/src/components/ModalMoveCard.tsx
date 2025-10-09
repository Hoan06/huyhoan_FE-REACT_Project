import "../styles/DashBoardDetail.css";

interface ModalMoveCardProps {
  onClose: () => void;
}

export default function ModalMoveCard({ onClose }: ModalMoveCardProps) {
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
            value="Tổ chức sự kiện Year-end party !"
            readOnly
            className="inputMove"
          />
        </div>

        <div className="rowGroup">
          <div className="formGroup half">
            <label>List</label>
            <select className="inputMove">
              <option>In-progress</option>
            </select>
          </div>
          <div className="formGroup half">
            <label>Position</label>
            <select className="inputMove">
              <option>1</option>
            </select>
          </div>
        </div>

        <div className="footerMoveCard">
          <button className="btnMove">Move</button>
        </div>
      </div>
    </div>
  );
}
