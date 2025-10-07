import { configureStore } from "@reduxjs/toolkit";
import resgisterReducer from "../api/resgisterSlice";
import loginReducer from "../api/loginSlice";

const store = configureStore({
  reducer: {
    resgister: resgisterReducer,
    login: loginReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
