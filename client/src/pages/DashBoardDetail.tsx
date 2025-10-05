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
import board1 from "../assets/images/board1.jpg";
import HeaderMain from "../components/HeaderMain";

export default function DashBoardDetail() {
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);

  return (
    <>
      {/* Header */}
      <HeaderMain onOpenSidebar={() => setShowSidebarMobile(true)}></HeaderMain>

      <div className="containerDashboard">
        {/* Overlay mobile */}
        <div
          className={`overlaySidebar ${
            showSidebarMobile ? "showOverlaySidebar" : ""
          }`}
          onClick={() => setShowSidebarMobile(false)}
        ></div>

        {/* Sidebar */}
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
            <div className="boardsSidebar typeSidebar">
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
          {/* Header của content */}
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
              <div className="btncloseBoard">
                <img src={iconCloseDetail} alt="" />
                <span className="textCloseBoard">Close this board</span>
              </div>
            </div>
            <div className="block2">
              <img className="iconFilter" src={iconFilter} alt="" />
              <span className="textFilterBlock2">Filter</span>
            </div>
          </div>

          {/* Các list */}
          <div className="mainContent">
            <div className="listsContainer">
              {/* Todo */}
              <div className="list">
                <div className="listHeader">Todo</div>
                <div className="card">
                  <img
                    className="tickerCardSuccess"
                    src={iconTickerSuccess}
                    alt=""
                  />
                  Thuê DJ
                </div>
                <div className="card">Lên kịch bản chương trình</div>
                <div className="card">Chuẩn bị kịch</div>
                <div className="card">Kịch bản</div>
                <div className="card">Thuê MC</div>
                <div className="addCard">+ Add a card</div>
              </div>

              {/* In-progress */}
              {/* <div className="list">
                <div className="listHeader">In-progress</div>
                <div className="addCard">+ Add a card</div>
              </div> */}

              {/* Add another list */}
              <div className="list addList">+ Add another list</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
