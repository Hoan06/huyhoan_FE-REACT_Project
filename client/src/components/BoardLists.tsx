import { useState } from "react";
import iconTickerSuccess from "../assets/icons/icon_tickerSuccess.png";
import iconTickerFalse from "../assets/icons/icon_ticker_false.png";
import iconDeleteList from "../assets/icons/icon_save_card.png";
import type { List, Task } from "../utils/Types";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { addList, deleteList, updateList } from "../api/listSlice";
import { addTask, deleteTasksByListId } from "../api/taskSlice";
import Swal from "sweetalert2";

interface BoardListsProps {
  lists: List[];
  tasks: Task[];
  onCardClick: (task: Task) => void;
}

export default function BoardLists({
  lists,
  tasks,
  onCardClick,
}: BoardListsProps) {
  const [addingCardIds, setAddingCardIds] = useState<number[]>([]);
  const [editingListId, setEditingListId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const [newTaskTitles, setNewTaskTitles] = useState<{ [key: number]: string }>(
    {}
  );
  const [error, setError] = useState("");
  const [errorTask, setErrorTask] = useState("");
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const handleEditListTitle = (listId: number, currentTitle: string) => {
    setEditingListId(listId);
    setEditedTitle(currentTitle);
  };

  const handleAddList = () => {
    if (!newListTitle.trim()) {
      setError("Tên list không được để trống!");
      return;
    }
    const newList = {
      board_id: Number(id),
      title: newListTitle,
      created_at: new Date().toISOString(),
    };
    dispatch(addList(newList));
    setNewListTitle("");
    setIsAddingList(false);
  };

  const handleAddTask = (listId: number) => {
    const title = newTaskTitles[listId]?.trim();

    if (!title) {
      setErrorTask("Tên task không được để trống!");
      return;
    }

    const newTask = {
      list_id: listId,
      title,
      description: "",
      status: "pending",
      due_date: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    dispatch(addTask(newTask));

    // reset lại input + đóng form
    setNewTaskTitles({ ...newTaskTitles, [listId]: "" });
    setAddingCardIds(addingCardIds.filter((id) => id !== listId));
    setErrorTask("");
  };

  // update list
  const handleSaveListTitle = (listId: number) => {
    if (!editedTitle.trim()) {
      setError("Tên list không được để trống!");
      return;
    }

    const currentList = lists.find((l) => l.id === listId);
    if (!currentList) return;

    const updatedList = {
      ...currentList,
      title: editedTitle.trim(),
      created_at: currentList.created_at,
    };

    dispatch(updateList(updatedList));
    setEditingListId(null);
    setError("");
  };

  // xóa list
  const handleDeleteList = (listId: number) => {
    Swal.fire({
      title: "Xác nhận xóa?",
      text: "Tất cả các task trong list này sẽ bị xóa!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteList(listId));
        dispatch(deleteTasksByListId(listId));
        Swal.fire("Đã xóa!", "List và các task đã được xóa.", "success");
      }
    });
  };

  return (
    <div className="listsContainer">
      {lists.map((list) => {
        const listTasks = tasks.filter((task) => task.list_id === list.id);

        return (
          <div key={list.id} className="list">
            <div className="listHeader">
              {editingListId === list.id ? (
                <>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => {
                      setEditedTitle(e.target.value);
                      setError("");
                    }}
                    onBlur={() => handleSaveListTitle(list.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveListTitle(list.id);
                    }}
                    autoFocus
                    className="editListInput"
                  />
                  {error && <p style={{ color: "red" }}>{error}</p>}
                </>
              ) : (
                <span
                  className="listTitleText"
                  onClick={() => handleEditListTitle(list.id, list.title)}
                >
                  {list.title}
                </span>
              )}
            </div>

            {listTasks.map((card) => (
              <div
                key={card.id}
                className="card"
                onClick={() => onCardClick(card)}
              >
                <img
                  className="tickerCardSuccess"
                  src={
                    card.status === "done" ? iconTickerSuccess : iconTickerFalse
                  }
                  alt={card.status === "done" ? "completed" : "not completed"}
                />
                {card.title}
              </div>
            ))}

            {/* add task */}
            {addingCardIds.includes(list.id) ? (
              <div className="addCardForm">
                <input
                  type="text"
                  placeholder="Enter a title or paste a link"
                  value={newTaskTitles[list.id] || ""}
                  onChange={(e) => {
                    setNewTaskTitles({
                      ...newTaskTitles,
                      [list.id]: e.target.value,
                    });
                    setErrorTask("");
                  }}
                />
                <p style={{ color: "red" }}>{errorTask && errorTask}</p>
                <div className="actionsAddCard">
                  <button
                    className="btnAddCard"
                    onClick={() => handleAddTask(list.id)}
                  >
                    Add card
                  </button>
                  <button
                    className="btnCancelAddCard"
                    onClick={() =>
                      setAddingCardIds(
                        addingCardIds.filter((id) => id !== list.id)
                      )
                    }
                  >
                    ✕
                  </button>
                </div>
              </div>
            ) : (
              <div className="addCard">
                <span
                  onClick={() => setAddingCardIds([...addingCardIds, list.id])}
                  style={{ cursor: "pointer" }}
                >
                  + Add a card
                </span>

                <img
                  src={iconDeleteList}
                  alt="delete list"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteList(list.id);
                  }}
                />
              </div>
            )}
          </div>
        );
      })}

      <div className="addAnotherListContainer">
        {isAddingList ? (
          <div className="addListForm">
            <input
              type="text"
              placeholder="Enter list title..."
              value={newListTitle}
              onChange={(e) => {
                setNewListTitle(e.target.value);
                setError("");
              }}
              className="inputAddList"
              autoFocus
            />
            <p style={{ color: "red" }}>{error ? error : ""}</p>
            <div className="actionsAddList">
              <button className="btnAddList" onClick={handleAddList}>
                Add list
              </button>
              <button
                className="btnCancelAddList"
                onClick={() => setIsAddingList(false)}
              >
                ✕
              </button>
            </div>
          </div>
        ) : (
          <div className="addAnotherList" onClick={() => setIsAddingList(true)}>
            + Add another list
          </div>
        )}
      </div>
    </div>
  );
}
