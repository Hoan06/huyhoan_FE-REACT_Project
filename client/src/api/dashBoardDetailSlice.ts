import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Board } from "../utils/Types";
import axios from "axios";

const API_BOARD = "http://localhost:3000/boards";

interface BoardState {
  status: "idle" | "pending" | "fulfilled" | "rejected";
  boards: Board[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

const initialState: BoardState = {
  status: "idle",
  boards: [],
  error: null,
};

export const deleteBoard = createAsyncThunk(
  "dashboard/deleteBoard",
  async (id: string) => {
    await axios.delete(`${API_BOARD}/${id}`);
    return id;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteBoard.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.boards = state.boards.filter(
          (b) => b.id !== Number(action.payload)
        );
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
