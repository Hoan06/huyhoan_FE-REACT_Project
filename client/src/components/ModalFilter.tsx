import iconCloseFilter from "../assets/icons/icon_close_filter.png";
import iconDate from "../assets/icons/icon_date_filter.png";
import iconOverdue from "../assets/icons/icon_overdue_filter.png";
import iconDueDay from "../assets/icons/icon_dueDay_filter.png";
import iconNoLabel from "../assets/icons/icon_noLabels.png";
import iconSelectFilter from "../assets/icons/icon_select_filter.png";

interface ModalFilterProps {
  onClose: () => void;
}

export default function ModalFilter({ onClose }: ModalFilterProps) {
  return (
    <div className="overlayModalFilter" onClick={onClose}>
      <div className="modalFilter" onClick={(e) => e.stopPropagation()}>
        <div className="headerModalFilter">
          <span className="textHeaderFilter">Filter</span>
          <span className="btnCloseFilter" role="button" onClick={onClose}>
            <img src={iconCloseFilter} alt="close filter" />
          </span>
        </div>

        <div className="mainModalFilter">
          {/* 🔍 Filter Keyword */}
          <div className="filterKeyword">
            <h3 className="textFilter">Keyword</h3>
            <input
              className="inputSearch"
              type="text"
              placeholder="Enter a keyword…"
            />
            <p className="searchCard">Search cards,</p>
          </div>

          {/* ✅ Filter Status */}
          <div className="filterStatus">
            <h3 className="textFilter">Card status</h3>
            <div className="completeStatus">
              <input className="checkboxFilter" type="checkbox" />
              <span className="textFilterDetail">Marked as complete</span>
            </div>
            <div className="completeStatus">
              <input className="checkboxFilter" type="checkbox" />
              <span className="textFilterDetail">Not marked as complete</span>
            </div>
          </div>

          {/* 📅 Filter Due Date */}
          <div className="blockDueDateMain">
            <h3 className="textFilter">Due date</h3>
            <div className="noDate blockDueDate">
              <input className="checkboxFilter" type="checkbox" />
              <span className="blockNoDate">
                <img className="iconNoDate" src={iconDate} alt="no date" />
              </span>
              <span className="textFilterNo">No dates</span>
            </div>

            <div className="blockDueDate">
              <input className="checkboxFilter" type="checkbox" />
              <span className="blockOverDue">
                <img className="iconClock" src={iconOverdue} alt="overdue" />
              </span>
              <span className="textFilterDetail">Overdue</span>
            </div>

            <div className="blockDueDate">
              <input className="checkboxFilter" type="checkbox" />
              <span className="blockDueNext">
                <img
                  className="iconClock"
                  src={iconDueDay}
                  alt="due next day"
                />
              </span>
              <span className="textFilterDetail">Due in the next day</span>
            </div>
          </div>

          {/* 🏷️ Filter Labels */}
          <div>
            <h3 className="textFilter textLabels">Labels</h3>
            <div className="labelsContainer">
              <div className="blockLabel blockNoLabelMain">
                <input className="checkboxFilter" type="checkbox" />
                <span className="blockNoLabel">
                  <img className="iconNoLabel" src={iconNoLabel} alt="" />
                </span>
                <span className="textFilterNo">No labels</span>
              </div>

              <div className="selectInputLabel">
                <input className="checkboxFilter" type="checkbox" />
                <div className="labelColor green" />
              </div>
              <div className="selectInputLabel">
                <input className="checkboxFilter" type="checkbox" />
                <div className="labelColor yellow" />
              </div>
              <div className="selectInputLabel">
                <input className="checkboxFilter" type="checkbox" />
                <div className="labelColor orange" />
              </div>
            </div>

            <div className="selectLabel blockLabel">
              <input className="checkboxFilter" type="checkbox" />
              <span className="textSelectFilter">Select labels</span>
              <img
                className="iconOpenFilter"
                src={iconSelectFilter}
                alt="open"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
