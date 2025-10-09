import { useState } from "react";
import iconTickerSuccess from "../assets/icons/icon_tickerSuccess.png";
import iconTickerFalse from "../assets/icons/icon_ticker_false.png";
import iconSaveCard from "../assets/icons/icon_save_card.png";
import type { List, Task } from "../utils/Types";

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

  return (
    <div className="listsContainer">
      {lists.map((list) => {
        const listTasks = tasks.filter((task) => task.list_id === list.id); // lọc task theo list

        return (
          <div key={list.id} className="list">
            <div className="listHeader">{list.title}</div>

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

            {/* Add a card cho từng list */}
            {addingCardIds.includes(list.id) ? (
              <div className="addCardForm">
                <input
                  type="text"
                  placeholder="Enter a title or paste a link"
                />
                <div className="actionsAddCard">
                  <button className="btnAddCard">Add card</button>
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
              <div
                className="addCard"
                onClick={() => setAddingCardIds([...addingCardIds, list.id])}
              >
                + Add a card <img src={iconSaveCard} alt="" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
