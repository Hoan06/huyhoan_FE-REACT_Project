import { useEffect, useState } from "react";
import "../styles/Board.css";
import iconBoard from "../assets/icons/Icon_board.png";
import iconStarsBoard from "../assets/icons/Icon_stars_board.png";
import iconCloseBoard from "../assets/icons/Icon_close_board.png";
import iconSignOut from "../assets/icons/icon_signOut.png";
import iconSetting from "../assets/icons/Icon_setting.png";
import iconWorkspaces from "../assets/icons/Icon_yourWorkspaces.png";
import logoTrelloFull from "../assets/logos/trello-logo-full.png.png";
import iconSchedule from "../assets/icons/Icon_schedule.png";
import HeaderMain from "../components/HeaderMain";
import { useLocation, useNavigate } from "react-router-dom";
import BoardCard from "../components/BoardCard";
import ClosedBoards from "../components/CloseBoard";
import ModalCreateBoard from "../components/ModalCreateBoard";
import ModalEditBoard from "../components/ModalEditBoard";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { fetchDataBoard } from "../api/boardSlice";
import { clearUser, fetchUser } from "../api/userSlice";
import type { Board } from "../utils/Types";
import StarredBoard from "../components/StarredBoard";

export default function Board() {
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);

  const [currentView, setCurrentView] = useState<
    "boards" | "starred" | "closed"
  >("boards");

  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);

  const { boards } = useSelector((state: RootState) => state.board);
  const { user } = useSelector((state: RootState) => state.user);
  const userBoards = boards.filter((board) => board.user_id === user?.id);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (location.state?.showClosedBoards) {
      setCurrentView("closed");
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    const check = localStorage.getItem("token");
    if (!check) {
      Swal.fire({
        icon: "warning",
        title: "Bạn chưa đăng nhập!",
        text: "Vui lòng đăng nhập để truy cập trang Board.",
        confirmButtonText: "Đăng nhập ngay",
        confirmButtonColor: "#3085d6",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    } else {
      dispatch(fetchUser());
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(fetchDataBoard());
  }, [dispatch, navigate]);

  const handleSignOut = () => {
    Swal.fire({
      title: "Đăng xuất?",
      text: "Bạn có chắc chắn muốn đăng xuất không?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Đăng xuất",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearUser());
        navigate("/");
        Swal.fire({
          icon: "success",
          title: "Đã đăng xuất!",
          showConfirmButton: false,
          timer: 1200,
        });
      }
    });
  };

  const handleBoardClick = (id: number) => {
    navigate(`/dashboard_detail/${id}`);
  };

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
              onClick={() => setCurrentView("boards")}
            >
              <img className="icons" src={iconBoard} alt="" />
              <span className="textIcons">Boards</span>
            </div>

            <div
              className="starredBoards typeSidebar"
              onClick={() => setCurrentView("starred")}
            >
              <img className="icons" src={iconStarsBoard} alt="" />
              <span className="textIcons">Starred Boards</span>
            </div>

            <div
              className="closeBoards typeSidebar"
              onClick={() => setCurrentView("closed")}
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
            <div className="SignOut typeSidebar" onClick={handleSignOut}>
              <img className="icons" src={iconSignOut} alt="" />
              <span className="textIcons">Sign out</span>
            </div>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="contentDashboard">
          {currentView === "boards" && (
            <>
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
                {userBoards.map((board, idx) => (
                  <BoardCard
                    key={idx}
                    id={board.id}
                    title={board.title}
                    img={board.backdrop}
                    onClick={() => handleBoardClick(board.id)}
                    onEdit={() => {
                      setSelectedBoard(board);
                      setShowModalUpdate(true);
                    }}
                  />
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

              <StarredBoard
                boards={userBoards
                  .filter((board) => board.is_starred)
                  .map((board) => ({
                    img: board.backdrop,
                    title: board.title,
                  }))}
              />
            </>
          )}

          {currentView === "starred" && (
            <StarredBoard
              boards={userBoards
                .filter((board) => board.is_starred)
                .map((board) => ({
                  img: board.backdrop,
                  title: board.title,
                }))}
            />
          )}

          {currentView === "closed" && (
            <ClosedBoards
              boards={userBoards
                .filter((board) => !board.is_starred)
                .map((board) => ({
                  img: board.backdrop,
                  title: board.title,
                }))}
            />
          )}
        </div>
      </div>

      {/* Modal thêm mới cái board */}
      {showModal && <ModalCreateBoard onClose={() => setShowModal(false)} />}

      {/* Modal sửa board */}
      {showModalUpdate && selectedBoard && (
        <ModalEditBoard
          board={selectedBoard}
          onClose={() => {
            setShowModalUpdate(false);
            setSelectedBoard(null);
          }}
        />
      )}
    </>
  );
}
