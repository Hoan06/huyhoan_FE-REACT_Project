import { useEffect, useState } from "react";
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
import iconSelect from "../assets/icons/icon_select.png";
import board1 from "../assets/images/board1.jpg";
import HeaderMain from "../components/HeaderMain";
import Swal from "sweetalert2";

import { useNavigate, useParams } from "react-router-dom";
import { Button, Calendar, Checkbox, DatePicker, Input, Modal } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { deleteBoard, toggleStarBoard } from "../api/dashBoardDetailSlice";
import BoardLists from "../components/BoardLists";
import ModalTaskDetail from "../components/ModalTaskDetail";
import ModalFilter from "../components/ModalFilter";
import ModalMoveCard from "../components/ModalMoveCard";
import { fetchList } from "../api/listSlice";
import { deleteTask, fetchTask, updateTask } from "../api/taskSlice";
import { fetchDataBoard } from "../api/boardSlice";
import { addTag, deleteTag, fetchTags, updateTag } from "../api/tagSlice";
import type { Tag } from "../utils/Types";
export default function DashBoardDetail() {
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  // phần modal detail
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("demo");
  const [value, setValue] = useState<string | undefined>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [status, setStatus] = useState(false);

  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  // chuyển trang
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

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

  const { id } = useParams<{ id: string }>();

  const currentBoard = useSelector((state: RootState) =>
    state.board.boards.find((b) => b.id === Number(id))
  );

  const [isStarred, setIsStarred] = useState(currentBoard?.is_starred ?? false);
  useEffect(() => {
    if (typeof currentBoard?.is_starred === "boolean") {
      setIsStarred(currentBoard.is_starred);
    }
  }, [currentBoard?.is_starred]);

  // lấy dữ liệu yourboard
  const boards = useSelector((state: RootState) => state.board.boards);
  const token = localStorage.getItem("token");
  const userCheckBoards = boards.filter((b) => b.user_id === Number(token));
  const userBoards = userCheckBoards.filter((b) => b.is_close === false);

  const { lists } = useSelector((state: RootState) => state.list);
  const { tasks } = useSelector((state: RootState) => state.task);
  const { tags } = useSelector((state: RootState) => state.tag);

  // lọc
  const [filterKeyword, setFilterKeyword] = useState("");
  const [filterComplete, setFilterComplete] = useState<null | boolean>(null);
  const [filterDue, setFilterDue] = useState<string | null>(null);
  const [filterLabels, setFilterLabels] = useState<string[]>([]);
  const filteredLists = lists.filter((l) => l.board_id === Number(id));
  let filteredTasks = tasks.filter((t) =>
    filteredLists.some((l) => l.id === t.list_id)
  );

  if (filterKeyword.trim()) {
    filteredTasks = filteredTasks.filter((t) =>
      t.title.toLowerCase().includes(filterKeyword.toLowerCase())
    );
  }

  if (filterComplete !== null) {
    filteredTasks = filteredTasks.filter((t) => t.status === filterComplete);
  }

  if (filterDue) {
    const now = dayjs();
    filteredTasks = filteredTasks.filter((t) => {
      if (!t.due_date) return filterDue === "nodate";
      const due = dayjs(t.due_date);
      if (filterDue === "overdue") return due.isBefore(now, "day");
      if (filterDue === "nextday")
        return due.isAfter(now, "day") && due.diff(now, "day") <= 1;
      return true;
    });
  }

  if (filterLabels.length > 0) {
    const includeNone = filterLabels.includes("none");
    const selectedColors = filterLabels.filter((c) => c !== "none");

    filteredTasks = filteredTasks.filter((t) => {
      const taskTagsForT = tags.filter((tag) => tag.task_id === t.id);
      const hasTags = taskTagsForT.length > 0;

      if (includeNone && selectedColors.length === 0) {
        return !hasTags;
      }

      const matchesColor = taskTagsForT.some((tag) =>
        selectedColors.includes(tag.color)
      );

      if (includeNone) {
        return !hasTags || matchesColor;
      }

      return matchesColor;
    });
  }

  useEffect(() => {
    dispatch(fetchDataBoard());
    dispatch(fetchList());
    dispatch(fetchTask());
    dispatch(fetchTags());
  }, [dispatch]);

  // modal create labels
  const [showCreateLabelModal, setShowCreateLabelModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  // modal edit labels
  const [showEditLabelModal, setShowEditLabelModal] = useState(false);

  //tag
  const taskTags = tags.filter((t) => t.task_id === selectedTaskId);
  const [newLabelName, setNewLabelName] = useState("");
  const [editingLabel, setEditingLabel] = useState<Tag | null>(null);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChangePage = () => {
    navigate("/dashboard");
  };

  const handleChangeCloseBoard = () => {
    navigate("/dashboard", { state: { showClosedBoards: true } });
  };

  const handleChangeStarredBoard = () => {
    navigate("/dashboard", { state: { showStarredBoards: true } });
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

  // xác nhận xóa task
  const handleDeleteCard = (taskId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTask(taskId));
        setShowModal(false);
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    });
  };

  // sửa task
  const handleSaveTask = async (
    newStatus?: boolean,
    closeAfterSave = false
  ) => {
    if (!selectedTaskId) return;

    const taskToUpdate = tasks.find((t) => t.id === selectedTaskId);
    if (!taskToUpdate) return;

    if (dueDate) {
      const createdAt = dayjs(taskToUpdate.created_at);
      if (dueDate.isBefore(createdAt, "minute")) {
        Swal.fire({
          title: "Invalid date!",
          text: "Ngày hết hạn không được trước ngày bắt đầu.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
    }

    if (!value || value.trim() === "") {
      Swal.fire({
        title: "Thiếu mô tả!",
        text: "Vui lòng nhập nội dung mô tả (description) trước khi lưu.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const updatedTask = {
      ...taskToUpdate,
      title,
      description: value || "",
      status: newStatus !== undefined ? newStatus : taskToUpdate.status,
      due_date: dueDate ? dueDate.toISOString() : taskToUpdate.due_date,
    };

    await dispatch(updateTask(updatedTask));

    if (closeAfterSave) {
      await Swal.fire({
        title: "Updated!",
        text: "Task has been updated successfully.",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });
      setShowModal(false);
    }
  };

  const handleToggleStar = async () => {
    if (!id) return;

    try {
      const updated = await dispatch(toggleStarBoard(Number(id))).unwrap();

      Swal.fire({
        title: updated.is_starred
          ? "Đã thêm vào danh sách sao!"
          : "Đã bỏ khỏi danh sách sao!",
        text: updated.is_starred
          ? "Board này sẽ hiển thị trong mục Starred Boards."
          : "Board này đã được gỡ khỏi mục Starred Boards.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire("Lỗi!", "Không thể cập nhật trạng thái sao.", "error");
    }
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
            <div
              className="starredBoards typeSidebar"
              onClick={handleChangeStarredBoard}
            >
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
              {userBoards.map((board) => (
                <div
                  key={board.id}
                  className="yourBoardInfo"
                  onClick={() => navigate(`/dashboard_detail/${board.id}`)}
                >
                  <div className="backgroundBoardInfo">
                    {board.backdrop?.startsWith("#") ? (
                      <div
                        className="backgroundYourBoard"
                        style={{
                          backgroundColor: board.backdrop,
                          width: "100%",
                          height: "100%",
                          borderRadius: "8px",
                        }}
                      ></div>
                    ) : (
                      <img
                        className="backgroundYourBoard"
                        src={board.backdrop || board1}
                        alt={board.title}
                      />
                    )}
                  </div>
                  <span className="textYourBoard">{board.title}</span>
                  {board.is_starred && (
                    <img
                      className="iconStarStarred"
                      src={iconStarsBoard}
                      alt=""
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="contentDashboard">
          <div className="headerBoard">
            <div className="block1">
              <h2 className="textInfoBoard">
                {currentBoard?.title || "Untitled Board"}
              </h2>
              <div className="starredBoard" onClick={handleToggleStar}>
                <img
                  className={`iconStarred ${isStarred ? "starred" : ""}`}
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
              lists={filteredLists}
              tasks={filteredTasks}
              onCardClick={(card) => {
                setTitle(card.title);
                setValue(card.description);
                setSelectedTaskId(card.id);
                setStatus(card.status);
                setShowModal(true);
              }}
            />
          </div>
        </div>
      </div>

      {/* modal filter */}
      {showFilter && (
        <ModalFilter
          onClose={() => setShowFilter(false)}
          filterValues={{
            keyword: filterKeyword,
            complete: filterComplete,
            due: filterDue,
            labels: filterLabels,
          }}
          onFilterChange={(values) => {
            setFilterKeyword(values.keyword);
            setFilterComplete(values.complete);
            setFilterDue(values.due);
            setFilterLabels(values.labels);
          }}
        />
      )}

      {/* modal detail */}
      {showModal && selectedTaskId && (
        <ModalTaskDetail
          title={title}
          value={value}
          status={status}
          isTitleEditable={isTitleEditable}
          onClose={handleCloseModal}
          onDelete={() => handleDeleteCard(selectedTaskId)}
          onToggleStatus={() => {
            const task = tasks.find((t) => t.id === selectedTaskId);
            if (!task) return;
            const newStatus = !task.status;
            setStatus(newStatus);
            handleSaveTask(newStatus);
          }}
          onEditTitle={() => setIsTitleEditable(true)}
          onChangeTitle={setTitle}
          onChangeValue={setValue}
          onOpenLabels={() => setShowLabelsModal(true)}
          onOpenDates={() => {
            const task = tasks.find((t) => t.id === selectedTaskId);
            if (task?.created_at) {
              setStartDate(dayjs(task.created_at));
            }
            setOpen(true);
          }}
          onOpenMove={() => setShowMoveModal(true)}
          onSave={() => {
            handleSaveTask(undefined, true);
            setIsTitleEditable(false);
          }}
          onNotEdit={() => {
            setIsTitleEditable(false);
          }}
        />
      )}

      {/* modal card move */}
      {showMoveModal && selectedTaskId && (
        <ModalMoveCard
          onClose={() => setShowMoveModal(false)}
          currentBoardId={Number(id)}
          selectedTaskId={selectedTaskId}
        />
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
            if (enableDue) setDueDate(date);
          }}
          headerRender={() => null}
        />

        {enableDue && (
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 8 }}
          >
            <DatePicker value={dueDate} onChange={(date) => setDueDate(date)} />
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
          <Button
            type="primary"
            style={{ marginRight: 8 }}
            onClick={() => {
              handleSaveTask(undefined, false);
              setOpen(false);
            }}
          >
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
              {taskTags.map((label) => (
                <div key={label.id} className="labelItem">
                  <input type="checkbox" className="labelCheckbox" />
                  <div
                    className="labelColorBox"
                    style={{ backgroundColor: label.color }}
                  >
                    <span className="labelName">{label.content}</span>
                  </div>

                  <button
                    className="editLabelBtn"
                    onClick={() => {
                      setEditingLabel(label);
                      setNewLabelName(label.content);
                      setSelectedColor(label.color);
                      setShowEditLabelModal(true);
                    }}
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
                value={newLabelName}
                onChange={(e) => setNewLabelName(e.target.value)}
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
              <button
                className="btnCreateLabel"
                onClick={() => {
                  if (!selectedTaskId || !selectedColor || !newLabelName)
                    return;
                  dispatch(
                    addTag({
                      task_id: selectedTaskId,
                      content: newLabelName,
                      color: selectedColor,
                    })
                  );
                  setNewLabelName("");
                  setSelectedColor(null);
                  setShowCreateLabelModal(false);
                }}
              >
                Create
              </button>
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
                value={newLabelName}
                onChange={(e) => setNewLabelName(e.target.value)}
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
                <button
                  className="btnSaveLabel"
                  onClick={() => {
                    if (!editingLabel) return;
                    dispatch(
                      updateTag({
                        ...editingLabel,
                        content: newLabelName,
                        color: selectedColor || editingLabel.color,
                      })
                    );
                    setShowEditLabelModal(false);
                    setEditingLabel(null);
                    setNewLabelName("");
                  }}
                >
                  Save
                </button>

                <button
                  className="btnDeleteLabel"
                  onClick={() => {
                    if (!editingLabel) return;
                    Swal.fire({
                      title: "Are you sure?",
                      text: "This label will be permanently deleted!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, delete it!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        dispatch(deleteTag(editingLabel.id));
                        Swal.fire(
                          "Deleted!",
                          "Your label has been deleted.",
                          "success"
                        );
                        setShowEditLabelModal(false);
                        setEditingLabel(null);
                        setNewLabelName("");
                      }
                    });
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
