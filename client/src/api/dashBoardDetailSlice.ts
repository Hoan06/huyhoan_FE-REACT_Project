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
    const response = await axios.patch(`${API_BOARD}/${id}`, {
      is_close: true,
    });
    return response.data;
  }
);

export const toggleStarBoard = createAsyncThunk(
  "dashboard/toggleStarBoard",
  async (id: number) => {
    const response = await axios.get(`${API_BOARD}/${id}`);
    const board = response.data;

    const updated = await axios.patch(`${API_BOARD}/${id}`, {
      is_starred: !board.is_starred,
    });

    return updated.data;
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
        state.boards = state.boards.filter((b) => b.id !== action.payload.id);
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(toggleStarBoard.pending, (state) => {
        state.status = "pending";
      })
      .addCase(toggleStarBoard.fulfilled, (state, action) => {
        state.boards = state.boards.map((b) =>
          b.id === action.payload.id ? action.payload : b
        );
      })
      .addCase(toggleStarBoard.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
