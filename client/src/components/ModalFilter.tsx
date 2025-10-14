import { useState } from "react";
import iconCloseFilter from "../assets/icons/icon_close_filter.png";
import iconDate from "../assets/icons/icon_date_filter.png";
import iconOverdue from "../assets/icons/icon_overdue_filter.png";
import iconDueDay from "../assets/icons/icon_dueDay_filter.png";
import iconNoLabel from "../assets/icons/icon_noLabels.png";
import iconSelectFilter from "../assets/icons/icon_select_filter.png";

interface FilterValues {
  keyword: string;
  complete: boolean | null;
  due: string | null; // "nodate" | "overdue" | "nextday"
  labels: string[];
}

interface ModalFilterProps {
  onClose: () => void;
  filterValues: FilterValues;
  onFilterChange: (values: FilterValues) => void;
}

export default function ModalFilter({
  onClose,
  filterValues,
  onFilterChange,
}: ModalFilterProps) {
  const [localFilter, setLocalFilter] = useState(filterValues);

  const updateFilter = (updated: Partial<FilterValues>) => {
    const newValues = { ...localFilter, ...updated };
    setLocalFilter(newValues);
    onFilterChange(newValues);
  };

  const toggleLabel = (color: string) => {
    const labels = localFilter.labels.includes(color)
      ? localFilter.labels.filter((c) => c !== color)
      : [...localFilter.labels, color];
    updateFilter({ labels });
  };

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
          {/*  Keyword */}
          <div className="filterKeyword">
            <h3 className="textFilter">Keyword</h3>
            <input
              className="inputSearch"
              type="text"
              placeholder="Enter a keyword…"
              value={localFilter.keyword}
              onChange={(e) => updateFilter({ keyword: e.target.value })}
            />
            <p className="searchCard">Search cards,</p>
          </div>

          {/*  Status */}
          <div className="filterStatus">
            <h3 className="textFilter">Card status</h3>
            <div className="completeStatus">
              <input
                className="checkboxFilter"
                type="checkbox"
                checked={localFilter.complete === true}
                onChange={(e) =>
                  updateFilter({
                    complete: e.target.checked ? true : null,
                  })
                }
              />
              <span className="textFilterDetail">Marked as complete</span>
            </div>
            <div className="completeStatus">
              <input
                className="checkboxFilter"
                type="checkbox"
                checked={localFilter.complete === false}
                onChange={(e) =>
                  updateFilter({
                    complete: e.target.checked ? false : null,
                  })
                }
              />
              <span className="textFilterDetail">Not marked as complete</span>
            </div>
          </div>

          {/*  Due Date */}
          <div className="blockDueDateMain">
            <h3 className="textFilter">Due date</h3>

            <div className="noDate blockDueDate">
              <input
                className="checkboxFilter"
                type="checkbox"
                checked={localFilter.due === "nodate"}
                onChange={(e) =>
                  updateFilter({
                    due: e.target.checked ? "nodate" : null,
                  })
                }
              />
              <span className="blockNoDate">
                <img className="iconNoDate" src={iconDate} alt="no date" />
              </span>
              <span className="textFilterNo">No dates</span>
            </div>

            <div className="blockDueDate">
              <input
                className="checkboxFilter"
                type="checkbox"
                checked={localFilter.due === "overdue"}
                onChange={(e) =>
                  updateFilter({
                    due: e.target.checked ? "overdue" : null,
                  })
                }
              />
              <span className="blockOverDue">
                <img className="iconClock" src={iconOverdue} alt="overdue" />
              </span>
              <span className="textFilterDetail">Overdue</span>
            </div>

            <div className="blockDueDate">
              <input
                className="checkboxFilter"
                type="checkbox"
                checked={localFilter.due === "nextday"}
                onChange={(e) =>
                  updateFilter({
                    due: e.target.checked ? "nextday" : null,
                  })
                }
              />
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

          {/*  Labels */}
          <div>
            <h3 className="textFilter textLabels">Labels</h3>
            <div className="labelsContainer">
              <div className="blockLabel blockNoLabelMain">
                <input
                  className="checkboxFilter"
                  type="checkbox"
                  checked={localFilter.labels.includes("none")}
                  onChange={() => toggleLabel("none")}
                />
                <span className="blockNoLabel">
                  <img className="iconNoLabel" src={iconNoLabel} alt="" />
                </span>
                <span className="textFilterNo">No labels</span>
              </div>

              {[
                "#4BCE97",
                "#FEA362",
                "#F87168",
                "#9F8FEF",
                "#E2B203",
                "#FF8B00",
                "#FF5630",
                "#6554C0",
                "#C0B6F2",
                "#57D9A3",
              ].map((color) => (
                <div key={color} className="selectInputLabel">
                  <input
                    className="checkboxFilter"
                    type="checkbox"
                    checked={localFilter.labels.includes(color)}
                    onChange={() => toggleLabel(color)}
                  />
                  <div
                    className="labelColor"
                    style={{ backgroundColor: color }}
                  />
                </div>
              ))}
            </div>

            <div className="selectLabel blockLabel">
              <input className="checkboxFilter" type="checkbox" disabled />
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
