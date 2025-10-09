import { MinusOutlined } from "@ant-design/icons";
import iconTickerSuccess from "../assets/icons/icon_tickerSuccess.png";
import iconTickerFalse from "../assets/icons/icon_ticker_false.png";
import iconSelectFilter from "../assets/icons/icon_select_filter.png";
import iconDescription from "../assets/icons/icon_description.png";
import iconNoLabel from "../assets/icons/icon_noLabels.png";
import iconDateTime from "../assets/icons/icon_date_time.png";
import MDEditor from "@uiw/react-md-editor";

interface ModalCardDetailProps {
  title: string;
  value: string | undefined;
  isCompleted: boolean;
  isTitleEditable: boolean;
  onClose: () => void;
  onDelete: () => void;
  onToggleComplete: () => void;
  onEditTitle: () => void;
  onChangeTitle: (newTitle: string) => void;
  onChangeValue: (newValue?: string) => void;
  onOpenLabels: () => void;
  onOpenDates: () => void;
  onOpenMove: () => void;
  onSave: () => void;
}

export default function ModalTaskDetail({
  title,
  value,
  isCompleted,
  isTitleEditable,
  onClose,
  onDelete,
  onToggleComplete,
  onEditTitle,
  onChangeTitle,
  onChangeValue,
  onOpenLabels,
  onOpenDates,
  onOpenMove,
  onSave,
}: ModalCardDetailProps) {
  return (
    <div className="overlayModalDetail" onClick={onClose}>
      <div className="modalDetail" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className="headerModalDetail">
          <div className="block1ModalDetail">
            <span className="iconCircle" onClick={onToggleComplete}>
              <img
                src={isCompleted ? iconTickerSuccess : iconTickerFalse}
                alt="status"
                className="iconTickerImg"
              />
            </span>

            {isTitleEditable ? (
              <input
                className="titleInput"
                value={title}
                onChange={(e) => onChangeTitle(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") onEditTitle();
                }}
              />
            ) : (
              <span className="titleText" onDoubleClick={onEditTitle}>
                {title}
              </span>
            )}
          </div>

          <div className="block2ModalDetail">
            in list{" "}
            <div
              style={{
                backgroundColor: "#DCDFE4",
                borderRadius: "6px",
                width: "100px",
                paddingLeft: "5px",
                cursor: "pointer",
              }}
              onClick={onOpenMove}
            >
              <div className="titleListDetail">
                demo <img src={iconSelectFilter} alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="mainModalDetail">
          <div className="block1MainDetail">
            <div className="descriptionHeader">
              <span className="textDescription">
                <img src={iconDescription} alt="" /> Description
              </span>
            </div>

            <div className="editorContainer" data-color-mode="light">
              <MDEditor
                value={value}
                onChange={onChangeValue}
                height={250}
                preview="edit"
              />
            </div>

            {/* SAVE & CANCEL */}
            <div className="actionModalDetail">
              <button className="saveDetail" onClick={onSave}>
                Save
              </button>
              <button className="cancelDetail" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="block2MainDetail">
            <div className="sideButton" onClick={onOpenLabels}>
              <img src={iconNoLabel} alt="" />
              <span>Labels</span>
            </div>
            <div className="sideButton" onClick={onOpenDates}>
              <img src={iconDateTime} alt="" />
              <span>Dates</span>
            </div>
            <div className="sideButtonDelete" onClick={onDelete}>
              <MinusOutlined />
              <span>Delete</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
