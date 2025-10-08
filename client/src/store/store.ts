import { configureStore } from "@reduxjs/toolkit";
import resgisterReducer from "../api/resgisterSlice";
import loginReducer from "../api/loginSlice";
import userReducer from "../api/userSlice";
import boardReducer from "../api/boardSlice";
import dashboardReducer from "../api/dashBoardDetail";

const store = configureStore({
  reducer: {
    resgister: resgisterReducer,
    login: loginReducer,
    user: userReducer,
    board: boardReducer,
    dashboard: dashboardReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
