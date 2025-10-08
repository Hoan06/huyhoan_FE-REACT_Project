import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../utils/Types";
import axios from "axios";

const API_USER = "http://localhost:3000/users";

interface UserState {
  user: User | null;
  status: "idle" | "pending" | "fulfilled" | "rejected";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

export const fetchUser = createAsyncThunk("board/fetchUser", async () => {
  try {
    const idUser = localStorage.getItem("token");
    const res = await axios.get(`${API_USER}/${idUser}`);
    return res.data;
  } catch (error) {
    return error;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
