import { createBrowserRouter } from "react-router-dom";

import "../App.css";
import Resgister from "../pages/Resgister";
import "../styles/Register.css";
import "../styles/Login.css";
import Login from "../pages/Login";
import DashBoardDetail from "../pages/DashBoardDetail";
import Board from "../pages/Board";

export const routers = createBrowserRouter([
  { path: "/", element: <Login></Login> },
  { path: "/resgister", element: <Resgister></Resgister> },
  {
    path: "/dashboard_detail/:id",
    element: <DashBoardDetail></DashBoardDetail>,
  },
  { path: "/dashboard", element: <Board></Board> },
]);
