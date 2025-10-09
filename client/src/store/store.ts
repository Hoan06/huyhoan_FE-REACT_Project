import { configureStore } from "@reduxjs/toolkit";
import resgisterReducer from "../api/resgisterSlice";
import loginReducer from "../api/loginSlice";
import userReducer from "../api/userSlice";
import boardReducer from "../api/boardSlice";
import dashboardReducer from "../api/dashBoardDetailSlice";
import listReducer from "../api/listSlice";
import taskReducer from "../api/taskSlice";

const store = configureStore({
  reducer: {
    resgister: resgisterReducer,
    login: loginReducer,
    user: userReducer,
    board: boardReducer,
    dashboard: dashboardReducer,
    list: listReducer,
    task: taskReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
