import { useState } from "react";
import "../styles/DashBoardDetail.css";
import iconBoard from "../assets/icons/Icon_board.png";
import iconStarsBoard from "../assets/icons/Icon_stars_board.png";
import iconCloseBoard from "../assets/icons/Icon_close_board.png";
import iconYourBoard from "../assets/icons/icon_your_board.png";
import logoTrelloFull from "../assets/logos/trello-logo-full.png.png";
import iconStarsBoardDetail from "../assets/icons/icon_stars_boardDetail.png";
import iconFrame from "../assets/icons/icon_frame.png";
import iconTable from "../assets/icons/icon_table.png";
import iconCloseDetail from "../assets/icons/icon_close_title.png";
import iconFilter from "../assets/icons/icon_filter.png";
import iconTickerSuccess from "../assets/icons/icon_tickerSuccess.png";
import iconTickerFalse from "../assets/icons/icon_ticker_false.png";
import iconDate from "../assets/icons/icon_date_filter.png";
import iconDateTime from "../assets/icons/icon_date_time.png";
import iconOverdue from "../assets/icons/icon_overdue_filter.png";
import iconDueDay from "../assets/icons/icon_dueDay_filter.png";
import iconNoLabel from "../assets/icons/icon_noLabels.png";
import iconSelectFilter from "../assets/icons/icon_select_filter.png";
import iconCloseFilter from "../assets/icons/icon_close_filter.png";
import board1 from "../assets/images/board1.jpg";
import HeaderMain from "../components/HeaderMain";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { MinusOutlined } from "@ant-design/icons";

export default function DashBoardDetail() {
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const [addingCard, setAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");

  const [addingList, setAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

  // phần này của chỉnh tên
  const [editingListTitle, setEditingListTitle] = useState(false);
  const [listTitle, setListTitle] = useState("Todo");

  // phần modal detail
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("demo");
  const [value, setValue] = useState<string | undefined>("");
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // modal move card
  const [showMoveModal, setShowMoveModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // chuyển trang
  const navigate = useNavigate();

  const handleChangePage = () => {
    navigate("/dashboard");
  };

  const handleCloseBoard = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, close it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Closed!", "Your board has been closed.", "success");
      }
    });
  };

  return (
    <>
      <HeaderMain onOpenSidebar={() => setShowSidebarMobile(true)} />

      <div className="containerDashboard">
        <div
          className={`overlaySidebar ${
            showSidebarMobile ? "showOverlaySidebar" : ""
          }`}
          onClick={() => setShowSidebarMobile(false)}
        ></div>

        <div
          className={`sidebar ${
            showSidebarMobile ? "displaySidebarMobile" : ""
          }`}
        >
          <div className="headerSidebarMedia">
            <img className="logoTrello" src={logoTrelloFull} alt="" />
          </div>
          <span className="headingSidebar">YOUR WORKSPACES</span>
          <div className="listNavbar">
            <div
              className="boardsSidebar typeSidebar"
              onClick={handleChangePage}
            >
              <img className="icons" src={iconBoard} alt="" />
              <span className="textIcons">Boards</span>
            </div>
            <div className="starredBoards typeSidebar">
              <img className="icons" src={iconStarsBoard} alt="" />
              <span className="textIcons">Starred Boards</span>
            </div>
            <div className="closeBoards typeSidebar">
              <img className="icons" src={iconCloseBoard} alt="" />
              <span className="textIcons">Closed Boards</span>
            </div>
          </div>
          <div className="lineSidebar"></div>
          <div className="listNavbar listBoardsNavbar">
            <div className="headerYourBoards">
              <span className="textHeaderYourBoard">Your boards</span>
              <span className="plusYourboard">
                <img className="iconPlusYourboard" src={iconYourBoard} alt="" />
              </span>
            </div>
            <div className="listYourBoards">
              <div className="yourBoardInfo">
                <div className="backgroundBoardInfo">
                  <img className="backgroundYourBoard" src={board1} alt="" />
                </div>
                <span className="textYourBoard">123123213</span>
              </div>
            </div>
          </div>
        </div>

        <div className="contentDashboard">
          <div className="headerBoard">
            <div className="block1">
              <h2 className="textInfoBoard">
                Tổ chức sự kiện Year-end party !
              </h2>
              <div className="starredBoard">
                <img
                  className="iconStarred"
                  src={iconStarsBoardDetail}
                  alt=""
                />
              </div>
              <button className="btnBoard">
                <img className="iconBtnBoard" src={iconFrame} alt="" />
                <span className="textBtnBoard">Board</span>
              </button>
              <div className="tableBoard">
                <img className="iconTableBoard" src={iconTable} alt="" />
                <span className="textTable">Table</span>
              </div>

              <div className="btncloseBoard" onClick={handleCloseBoard}>
                <img src={iconCloseDetail} alt="" />
                <span className="textCloseBoard">Close this board</span>
              </div>
            </div>
            <div className="block2" onClick={() => setShowFilter(true)}>
              <img className="iconFilter" src={iconFilter} alt="" />
              <span className="textFilterBlock2">Filter</span>
            </div>
          </div>

          <div className="mainContent">
            <div className="listsContainer">
              <div className="list">
                <div className="listHeader">
                  {editingListTitle ? (
                    <input
                      type="text"
                      className="inputEditListTitle"
                      value={listTitle}
                      placeholder={listTitle}
                      onChange={(e) => setListTitle(e.target.value)}
                      onBlur={() => setEditingListTitle(false)}
                      autoFocus
                    />
                  ) : (
                    <span onClick={() => setEditingListTitle(true)}>
                      {listTitle}
                    </span>
                  )}
                </div>

                <div className="card">
                  <img
                    className="tickerCardSuccess"
                    src={iconTickerSuccess}
                    alt=""
                  />
                  Thuê DJ
                </div>
                <div className="card" onClick={() => setShowModal(true)}>
                  Lên kịch bản chương trình
                </div>
                <div className="card">Chuẩn bị kịch</div>
                <div className="card">Kịch bản</div>
                <div className="card">Thuê MC</div>

                {addingCard ? (
                  <div className="addCardForm">
                    <input
                      type="text"
                      placeholder="Enter a title or paste a link"
                      value={newCardTitle}
                      onChange={(e) => setNewCardTitle(e.target.value)}
                      className="inputAddCard"
                    />
                    <div className="actionsAddCard">
                      <button
                        className="btnAddCard"
                        onClick={() => {
                          console.log("New card:", newCardTitle);
                          setNewCardTitle("");
                          setAddingCard(false);
                        }}
                      >
                        Add card
                      </button>
                      <button
                        className="btnCancelAddCard"
                        onClick={() => setAddingCard(false)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="addCard" onClick={() => setAddingCard(true)}>
                    + Add a card
                  </div>
                )}
              </div>

              {addingList ? (
                <div className="formAddList">
                  <input
                    type="text"
                    placeholder="Enter list name..."
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                    className="inputAddList"
                  />
                  <div className="actionsAddList">
                    <button
                      className="btnAddList"
                      onClick={() => {
                        console.log("New list:", newListTitle);
                        setNewListTitle("");
                        setAddingList(false);
                      }}
                    >
                      Add list
                    </button>
                    <button
                      className="btnCancelAddList"
                      onClick={() => setAddingList(false)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="list addList"
                  onClick={() => setAddingList(true)}
                >
                  + Add another list
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showFilter && (
        <div
          className="overlayModalFilter"
          onClick={() => setShowFilter(false)}
        >
          <div className="modalFilter" onClick={(e) => e.stopPropagation()}>
            <div className="headerModalFilter">
              <span className="textHeaderFilter">Filter</span>
              <span
                className="btnCloseFilter"
                role="button"
                onClick={() => setShowFilter(false)}
              >
                <img src={iconCloseFilter} alt="close filter" />
              </span>
            </div>

            <div className="mainModalFilter">
              <div className="filterKeyword">
                <h3 className="textFilter">Keyword</h3>
                <input
                  className="inputSearch"
                  type="text"
                  placeholder="Enter a keyword…"
                />
                <p className="searchCard">Search cards,</p>
              </div>

              <div className="filterStatus">
                <h3 className="textFilter">Card status</h3>
                <div className="completeStatus">
                  <input className="checkboxFilter" type="checkbox" />
                  <span className="textFilterDetail">Marked as complete</span>
                </div>
                <div className="completeStatus">
                  <input className="checkboxFilter" type="checkbox" />
                  <span className="textFilterDetail">
                    Not marked as complete
                  </span>
                </div>
              </div>

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
                    <img
                      className="iconClock"
                      src={iconOverdue}
                      alt="overdue"
                    />
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
      )}
      {showModal && (
        <div className="overlayModalDetail" onClick={handleCloseModal}>
          <div className="modalDetail" onClick={(e) => e.stopPropagation()}>
            {/* HEADER */}
            <div className="headerModalDetail">
              <div className="block1ModalDetail">
                <span
                  className="iconCircle"
                  onClick={() => {
                    setIsCompleted(!isCompleted);
                    setIsTitleEditable(!isTitleEditable);
                  }}
                >
                  <img
                    src={isCompleted ? iconTickerSuccess : iconTickerFalse}
                    alt={isCompleted ? "tích xanh" : "chưa tích"}
                    className="iconTickerImg"
                  />
                </span>

                {/* Tiêu đề */}
                {isTitleEditable ? (
                  <input
                    className="titleInput"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                  />
                ) : (
                  <span className="titleText">{title}</span>
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
                  }}
                  onClick={() => setShowMoveModal(true)}
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
                  <i className="fa fa-align-left"></i>
                  <span className="textDescription">Description</span>
                </div>

                <div className="editorContainer" data-color-mode="light">
                  <MDEditor
                    value={value}
                    onChange={setValue}
                    height={250}
                    preview="edit"
                  />
                </div>

                <div className="actionModalDetail">
                  <button className="saveDetail">Save</button>
                  <button className="cancelDetail" onClick={handleCloseModal}>
                    Cancel
                  </button>
                </div>
              </div>

              <div className="block2MainDetail">
                <div className="sideButton">
                  <img src={iconNoLabel} alt="" />
                  <span>Labels</span>
                </div>
                <div className="sideButton">
                  <img src={iconDateTime} alt="" />
                  <span>Dates</span>
                </div>
                <div className="sideButtonDelete">
                  <MinusOutlined />
                  <span>Delete</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* modal card move */}
      {showMoveModal && (
        <div
          className="overlayMoveCard"
          onClick={() => setShowMoveModal(false)}
        >
          <div className="modalMoveCard" onClick={(e) => e.stopPropagation()}>
            <div className="headerMoveCard">
              <h3>Move card</h3>
              <span
                className="closeBtn"
                onClick={() => setShowMoveModal(false)}
              >
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
      )}
    </>
  );
}
