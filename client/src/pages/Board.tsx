import { useState } from "react";
import "../styles/Board.css";
import iconBoard from "../assets/icons/Icon_board.png";
import iconStarsBoard from "../assets/icons/Icon_stars_board.png";
import iconCloseBoard from "../assets/icons/Icon_close_board.png";
import iconSignOut from "../assets/icons/icon_signOut.png";
import iconSetting from "../assets/icons/Icon_setting.png";
import iconWorkspaces from "../assets/icons/Icon_yourWorkspaces.png";
import logoTrelloFull from "../assets/logos/trello-logo-full.png.png";
import iconSchedule from "../assets/icons/Icon_schedule.png";
import iconStars from "../assets/icons/icon_title_stars.png";
import iconEditBoard from "../assets/icons/icon_edit_board.png";
import iconSelect from "../assets/icons/icon_select.png";
import iconCloseModalCreate from "../assets/icons/icon_close_modal_create.png";
import board1 from "../assets/images/board1.jpg";
import board2 from "../assets/images/board2.jpg";
import board3 from "../assets/images/board3.jpg";
import board4 from "../assets/images/board4.jpg";
import board1Starred from "../assets/images/board1-starred.jpg";
import board2Starred from "../assets/images/board2-starred.jpg";
import HeaderMain from "../components/HeaderMain";
import { CloseCircleOutlined } from "@ant-design/icons";

export default function Board() {
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [hoveredBoard, setHoveredBoard] = useState<number | null>(null);
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);
  const [showClosedBoards, setShowClosedBoards] = useState(false);

  const boards = [
    { img: board1, title: "Board Title 01" },
    { img: board2, title: "Board Title 02" },
    { img: board3, title: "Board Title 03" },
    { img: board4, title: "Board Title 04" },
  ];

  return (
    <>
      {/* Header */}
      <HeaderMain onOpenSidebar={() => setShowSidebarMobile(true)}></HeaderMain>

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
              onClick={() => setShowClosedBoards(false)}
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
              onClick={() => setShowClosedBoards(true)}
            >
              <img className="icons" src={iconCloseBoard} alt="" />
              <span className="textIcons">Closed Boards</span>
            </div>
          </div>

          <div className="lineSidebar"></div>

          <div className="listNavbar">
            <div className="settingSidebar typeSidebar">
              <img className="icons" src={iconSetting} alt="" />
              <span className="textIcons">Settings</span>
            </div>
            <div className="SignOut typeSidebar">
              <img className="icons" src={iconSignOut} alt="" />
              <span className="textIcons">Sign out</span>
            </div>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="contentDashboard">
          {!showClosedBoards ? (
            <>
              {/* --- Your Workspaces + Starred Boards --- */}
              <div className="headerContent">
                <div className="block1">
                  <img
                    className="listContentIcon"
                    src={iconWorkspaces}
                    alt=""
                  />
                  <h1 className="textList">Your Workspaces</h1>
                </div>
                <div className="block2">
                  <div className="actionContent">
                    <div className="shareAction actionInfo">Share</div>
                    <div className="exportAction actionInfo">Export</div>
                  </div>
                  <div className="filterTime">
                    <img className="calendarIcon" src={iconSchedule} alt="" />
                    <select className="selectCalendar" name="" id="">
                      <option className="optionCalendar" value="week">
                        This week
                      </option>
                      <option className="optionCalendar" value="month">
                        This month
                      </option>
                      <option className="optionCalendar" value="year">
                        This year
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="listBoards">
                {boards.map((board, idx) => (
                  <div
                    className="boardInfo"
                    key={idx}
                    onMouseEnter={() => setHoveredBoard(idx)}
                    onMouseLeave={() => setHoveredBoard(null)}
                    style={{ position: "relative" }}
                  >
                    <img className="backgroundBoard" src={board.img} alt="" />
                    <div className="overlay"></div>
                    <span className="titleBoard">{board.title}</span>
                    {hoveredBoard === idx && (
                      <div
                        onClick={() => setShowModalUpdate(true)}
                        className="editBoard"
                        style={{ display: "flex" }}
                      >
                        <img src={iconEditBoard} alt="" />
                        <span className="textEdit">Edit this board</span>
                      </div>
                    )}
                  </div>
                ))}
                <div className="createBoard">
                  <button
                    className="btnCreateBoard"
                    onClick={() => setShowModal(true)}
                  >
                    Create new board
                  </button>
                </div>
              </div>

              <div className="headerStarred">
                <div className="textHeaderStarred">
                  <img className="listContentIcon" src={iconStars} alt="" />
                  <h1 className="textList textListStarred">Starred Boards</h1>
                </div>
              </div>

              <div className="listStarred">
                <div className="boardInfoStarred">
                  <img
                    className="backgroundBoardStarred"
                    src={board1Starred}
                    alt=""
                  />
                  <div className="overlay"></div>
                  <span className="titleBoardStarred">Important Board 01</span>
                </div>
                <div className="boardInfoStarred">
                  <img
                    className="backgroundBoardStarred"
                    src={board2Starred}
                    alt=""
                  />
                  <div className="overlay"></div>
                  <span className="titleBoardStarred">Important Board 02</span>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* --- Closed Boards --- */}
              <div className="headerClosed">
                <div className="textHeaderClosed">
                  <CloseCircleOutlined className="listContentIcon" />
                  <h1 className="textList textListClosed">Closed Boards</h1>
                </div>
              </div>
              <div className="listClosed">
                <div className="boardInfoClosed">
                  <img className="backgroundBoardClosed" src={board1} alt="" />
                  <div className="overlay"></div>
                  <span className="titleBoardClosed">Important Board 01</span>
                </div>
                <div className="boardInfoClosed">
                  <img className="backgroundBoardClosed" src={board2} alt="" />
                  <div className="overlay"></div>
                  <span className="titleBoardClosed">Important Board 02</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal thêm mới cái board */}
      {showModal && (
        <>
          <div
            className="overlayModalCreate"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="modalCreateBoard">
            <div className="headerModalCreate">
              <h2 className="textHeaderCreate">Create board</h2>
              <div
                className="closeModalCreate"
                onClick={() => setShowModal(false)}
                style={{ cursor: "pointer" }}
              >
                <img className="btnClose" src={iconCloseModalCreate} alt="" />
              </div>
            </div>
            <div className="contentCreateBoard">
              <div className="choiceBackgroundCreate">
                <h2 className="textModalBackground">Background</h2>
                <div className="listBackgroundCreate">
                  <div className="backgroundCreateInfo">
                    <img className="imgBackground" src={board1} alt="" />
                    <img className="selectIconCreate" src={iconSelect} alt="" />
                  </div>
                  <div className="backgroundCreateInfo">
                    <img className="imgBackground" src={board2} alt="" />
                    <img className="selectIconCreate" src={iconSelect} alt="" />
                  </div>
                  <div className="backgroundCreateInfo">
                    <img className="imgBackground" src={board3} alt="" />
                    <img className="selectIconCreate" src={iconSelect} alt="" />
                  </div>
                  <div className="backgroundCreateInfo">
                    <img className="imgBackground" src={board4} alt="" />
                    <img className="selectIconCreate" src={iconSelect} alt="" />
                  </div>
                </div>
              </div>
              <div className="lineModalCreate"></div>
              <div className="choiceColorCreate">
                <h2 className="textModalColor">Color</h2>
                <div className="listColorCreate">
                  <div className="colorCreateInfo">
                    <div className="color1"></div>
                    <img className="selectIconCreate" src={iconSelect} alt="" />
                  </div>
                  <div className="colorCreateInfo">
                    <div className="color2"></div>
                    <img className="selectIconCreate" src={iconSelect} alt="" />
                  </div>
                  <div className="colorCreateInfo">
                    <div className="color3"></div>
                    <img className="selectIconCreate" src={iconSelect} alt="" />
                  </div>
                  <div className="colorCreateInfo">
                    <div className="color4"></div>
                    <img className="selectIconCreate" src={iconSelect} alt="" />
                  </div>
                  <div className="colorCreateInfo">
                    <div className="color5"></div>
                    <img className="selectIconCreate" src={iconSelect} alt="" />
                  </div>
                  <div className="colorCreateInfo">
                    <div className="color6"></div>
                    <img className="selectIconCreate" src={iconSelect} alt="" />
                  </div>
                </div>
              </div>
              <div className="lineModalCreate"></div>
              <div className="boardTitleModal">
                <h2 className="textBoardTitle">
                  Board title <span>*</span>
                </h2>
                <input
                  className="inputTitle"
                  type="text"
                  placeholder="E.g. Shopping list for birthday..."
                />
                <p className="noticeTitle">
                  👋 Please provide a valid board title.
                </p>
              </div>
            </div>
            <div className="footerModalCreate">
              <div className="selectButtonCreate">
                <button
                  className="closeModalCreateFooter"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button className="createNewBoard">Create</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modal sửa board */}
      {showModalUpdate && (
        <>
          <div
            className="overlayModalCreate"
            onClick={() => setShowModalUpdate(false)}
          ></div>
          <div className="modalCreateBoard">
            <div className="headerModalCreate">
              <h2 className="textHeaderCreate">Update board</h2>
              <div
                className="closeModalCreate"
                onClick={() => setShowModalUpdate(false)}
                style={{ cursor: "pointer" }}
              >
                <img className="btnClose" src={iconCloseModalCreate} alt="" />
              </div>
            </div>
            <div className="contentCreateBoard">
              <div className="choiceBackgroundCreate">
                <h2 className="textModalBackground">Background</h2>
                <div className="listBackgroundCreate">
                  <div className="backgroundCreateInfo">
                    <img className="imgBackground" src={board1} alt="" />
                    <img className="selectIconCreate" src={iconSelect} alt="" />
                  </div>
                  <div className="backgroundCreateInfo">
                    <img className="imgBackground" src={board2} alt="" />
                    <img className="selectIconCreate" src={iconSelect} alt="" />
                  </div>
                  <div className="backgroundCreateInfo">
                    <img className="imgBackground" src={board3} alt="" />
                    <img className="selectIconCreate" src={iconSelect} alt="" />
                  </div>
                  <div className="backgroundCreateInfo">
                    <img className="imgBackground" src={board4} alt="" />
                    <img className="selectIconCreate" src={iconSelect} alt="" />
                  </div>
                </div>
              </div>
              <div className="lineModalCreate"></div>
              <div className="choiceColorCreate">
                <h2 className="textModalColor">Color</h2>
                <div className="listColorCreate">
                  <div className="colorCreateInfo">
                    <div className="color1"></div>
                    <img className="selectIconCreate" src={iconSelect} alt="" />
                  </div>
                  <div className="colorCreateInfo">
                    <div className="color2"></div>
                    <img className="selectIconCreate" src={iconSelect} alt="" />
                  </div>
                  <div className="colorCreateInfo">
                    <div className="color3"></div>
                    <img className="selectIconCreate" src={iconSelect} alt="" />
                  </div>
                  <div className="colorCreateInfo">
                    <div className="color4"></div>
                    <img className="selectIconCreate" src={iconSelect} alt="" />
                  </div>
                  <div className="colorCreateInfo">
                    <div className="color5"></div>
                    <img className="selectIconCreate" src={iconSelect} alt="" />
                  </div>
                  <div className="colorCreateInfo">
                    <div className="color6"></div>
                    <img className="selectIconCreate" src={iconSelect} alt="" />
                  </div>
                </div>
              </div>
              <div className="lineModalCreate"></div>
              <div className="boardTitleModal">
                <h2 className="textBoardTitle">
                  Board title <span>*</span>
                </h2>
                <input
                  className="inputTitle"
                  type="text"
                  placeholder="E.g. Shopping list for birthday..."
                />
                <p className="noticeTitle">
                  👋 Please provide a valid board title.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
