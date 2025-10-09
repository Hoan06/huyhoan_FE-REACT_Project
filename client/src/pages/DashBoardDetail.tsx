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
import iconSelect from "../assets/icons/icon_select.png";
// import iconSaveCard from "../assets/icons/icon_save_card.png";
import iconDescription from "../assets/icons/icon_description.png";
import board1 from "../assets/images/board1.jpg";
import HeaderMain from "../components/HeaderMain";
import Swal from "sweetalert2";

import { useNavigate, useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { MinusOutlined } from "@ant-design/icons";
import { Button, Calendar, Checkbox, DatePicker, Input, Modal } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { deleteBoard } from "../api/dashBoardDetailSlice";
import BoardLists from "../components/BoardLists";
import type { Task, List } from "../utils/Types";
export default function DashBoardDetail() {
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  // const [addingCard, setAddingCard] = useState(false);
  // const [newCardTitle, setNewCardTitle] = useState("");

  // const [addingList, setAddingList] = useState(false);
  // const [newListTitle, setNewListTitle] = useState("");

  // // phần này của chỉnh tên
  // const [editingListTitle, setEditingListTitle] = useState(false);
  // const [listTitle, setListTitle] = useState("Todo");

  // phần modal detail
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("demo");
  const [value, setValue] = useState<string | undefined>("");
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // modal move card
  const [showMoveModal, setShowMoveModal] = useState(false);

  // modal date detail
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(dayjs());
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);
  const [enableDue, setEnableDue] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(dayjs());

  // modal labels
  const [showLabelsModal, setShowLabelsModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [labels, setLabels] = useState([
    { id: 1, name: "done", color: "#4BCE97" },
    { id: 2, name: "urgent", color: "#FEA362" },
    { id: 3, name: "todo", color: "#F87168" },
    { id: 4, name: "in-progress", color: "#9F8FEF" },
  ]);

  const lists: List[] = [
    {
      id: 201,
      board_id: 101,
      title: "Việc cần làm",
      created_at: "2025-02-28T13:00:00Z",
    },
    {
      id: 202,
      board_id: 102,
      title: "Ideas",
      created_at: "2025-03-01T10:30:00Z",
    },
    {
      id: 203,
      board_id: 103,
      title: "Backlog",
      created_at: "2025-03-02T11:30:00Z",
    },
  ];

  const tasks: Task[] = [
    {
      id: 301,
      list_id: 201,
      title: "Thiết kế giao diện",
      description: "Tạo wireframe cho trang chủ",
      status: "pending",
      due_date: "2025-03-05T23:59:59Z",
      created_at: "2025-02-28T13:30:00Z",
    },
    {
      id: 302,
      list_id: 202,
      title: "Nghiên cứu thị trường",
      description: "Phân tích đối thủ",
      status: "in_progress",
      due_date: "2025-03-06T17:00:00Z",
      created_at: "2025-03-01T11:00:00Z",
    },
    {
      id: 303,
      list_id: 203,
      title: "Setup project",
      description: "Khởi tạo repo Git",
      status: "done",
      due_date: "2025-03-04T20:00:00Z",
      created_at: "2025-03-02T12:00:00Z",
    },
  ];
  // modal create labels
  const [showCreateLabelModal, setShowCreateLabelModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  // modal edit labels
  const [showEditLabelModal, setShowEditLabelModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // chuyển trang
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const handleChangePage = () => {
    navigate("/dashboard");
  };

  const handleChangeCloseBoard = () => {
    navigate("/dashboard", { state: { showClosedBoards: true } });
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
      if (result.isConfirmed && id) {
        dispatch(deleteBoard(id))
          .unwrap()
          .then(() => {
            Swal.fire("Deleted!", "Your board has been deleted.", "success");
            navigate("/dashboard");
            setShowModal(false);
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete board.", "error");
          });
      }
    });
  };

  // xác nhận xóa card
  const handleDeleteCard = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your card has been deleted.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        setShowModal(false);
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
            <div
              className="closeBoards typeSidebar"
              onClick={handleChangeCloseBoard}
            >
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

          {/* hiển thị list */}
          <div className="mainContent">
            <BoardLists
              lists={lists}
              tasks={tasks}
              onCardClick={(card) => {
                setTitle(card.title);
                setValue(card.description);
                setShowModal(true);
              }}
            />
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

      {/* modal detail */}
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
                  <span className="textDescription">
                    <img src={iconDescription} alt="" /> Description
                  </span>
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
                <div
                  className="sideButton"
                  onClick={() => setShowLabelsModal(true)}
                >
                  <img src={iconNoLabel} alt="" />
                  <span>Labels</span>
                </div>
                <div className="sideButton" onClick={() => setOpen(true)}>
                  <img src={iconDateTime} alt="" />
                  <span>Dates</span>
                </div>
                <div className="sideButtonDelete" onClick={handleDeleteCard}>
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

      {/* modal date*/}
      <Modal
        title="Dates"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        centered
        width={360}
        zIndex={3334}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Button
            type="text"
            onClick={() => setSelectedMonth(selectedMonth.subtract(1, "month"))}
          >
            ‹
          </Button>
          <span style={{ fontWeight: 600 }}>
            {selectedMonth.format("MMMM YYYY")}
          </span>
          <Button
            type="text"
            onClick={() => setSelectedMonth(selectedMonth.add(1, "month"))}
          >
            ›
          </Button>
        </div>

        {/* Calendar */}
        <Calendar
          fullscreen={false}
          value={selectedMonth}
          onSelect={(date) => {
            if (!enableDue) setStartDate(date);
            else setDueDate(date);
          }}
          headerRender={() => null}
        />

        {enableDue && (
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 8 }}
          >
            <DatePicker
              showTime
              value={dueDate}
              format="DD/MM/YYYY HH:mm"
              onChange={(val) => setDueDate(val)}
            />
          </div>
        )}

        {/* Start Date */}
        <div style={{ marginTop: 16, display: "flex", alignItems: "center" }}>
          <Checkbox checked disabled />
          <Input
            value={startDate ? startDate.format("DD/MM/YYYY") : ""}
            readOnly
            style={{ width: 200, marginLeft: 8 }}
          />
        </div>

        <div style={{ marginTop: 16, display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={enableDue}
            onChange={(e) => setEnableDue(e.target.checked)}
          />
          <Input
            value={dueDate ? dueDate.format("DD/MM/YYYY HH:mm") : ""}
            readOnly
            style={{ width: 200, marginLeft: 8 }}
          />
        </div>

        <div style={{ marginTop: 24, textAlign: "center" }}>
          <Button type="primary" style={{ marginRight: 8 }}>
            Save
          </Button>
          <Button danger>Remove</Button>
        </div>
      </Modal>

      {/* modal labels */}
      {showLabelsModal && (
        <div
          className="overlayLabelsModal"
          onClick={() => setShowLabelsModal(false)}
        >
          <div className="labelsModal" onClick={(e) => e.stopPropagation()}>
            <div className="labelsHeader">
              <span className="title">Labels</span>
              <button
                className="btnCloseLabels"
                onClick={() => setShowLabelsModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="titleSonLabels">labels</div>

            <div className="labelsList">
              {labels.map((label) => (
                <div key={label.id} className="labelItem">
                  <input type="checkbox" className="labelCheckbox" />
                  <div
                    className="labelColorBox"
                    style={{ backgroundColor: label.color }}
                  >
                    <span className="labelName">{label.name}</span>
                  </div>

                  <button
                    className="editLabelBtn"
                    onClick={() => setShowEditLabelModal(true)}
                  >
                    ✎
                  </button>
                </div>
              ))}
            </div>

            <button
              className="createLabelBtn"
              onClick={() => setShowCreateLabelModal(true)}
            >
              Create a new label
            </button>
          </div>
        </div>
      )}

      {/* modal create labels */}
      {showCreateLabelModal && (
        <div
          className="overlayCreateLabel"
          onClick={() => setShowCreateLabelModal(false)}
        >
          <div
            className="createLabelModal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="headerCreateLabel">
              <h3 className="titleCreateLabel">Create label</h3>
              <button
                className="btnCloseCreateLabel"
                onClick={() => setShowCreateLabelModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="bodyCreateLabel">
              <label className="labelTitle">Title</label>
              <input
                type="text"
                placeholder="Enter label name..."
                className="inputCreateLabel"
              />

              <label className="labelColorTitle">Select a color</label>
              <div className="colorGrid">
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
                  <div
                    key={color}
                    className="colorOption"
                    style={{ backgroundColor: color, position: "relative" }}
                    onClick={() => setSelectedColor(color)}
                  >
                    {selectedColor === color && (
                      <img
                        src={iconSelect}
                        alt="selected"
                        className="iconSelectedColor"
                      />
                    )}
                  </div>
                ))}
              </div>
              <button className="btnCreateLabel">Create</button>
            </div>
          </div>
        </div>
      )}

      {/* modal edit labels */}
      {showEditLabelModal && (
        <div
          className="overlayCreateLabel"
          onClick={() => setShowEditLabelModal(false)}
        >
          <div
            className="createLabelModal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="headerCreateLabel">
              <h3 className="titleCreateLabel">Edit label</h3>
              <button
                className="btnCloseCreateLabel"
                onClick={() => setShowEditLabelModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="bodyCreateLabel">
              <label className="labelTitle">Title</label>
              <input
                type="text"
                placeholder="Enter label name..."
                className="inputCreateLabel"
              />

              <label className="labelColorTitle">Select a color</label>
              <div className="colorGrid">
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
                  <div
                    key={color}
                    className="colorOption"
                    style={{ backgroundColor: color, position: "relative" }}
                    onClick={() => setSelectedColor(color)}
                  >
                    {selectedColor === color && (
                      <img
                        src={iconSelect}
                        alt="selected"
                        className="iconSelectedColor"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="footerEditLabel">
                <button className="btnSaveLabel">Save</button>
                <button className="btnDeleteLabel">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
