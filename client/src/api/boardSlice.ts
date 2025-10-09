import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

export const fetchDataBoard = createAsyncThunk(
  "board/fetchDataBoard",
  async () => {
    try {
      const res = await axios.get(API_BOARD);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const addBoard = createAsyncThunk(
  "board/addBoard",
  async (
    newBoard: Omit<
      Board,
      "id" | "user_id" | "is_starred" | "is_close" | "created_at"
    >
  ) => {
    try {
      const res = await axios.post(API_BOARD, newBoard);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const updateBoard = createAsyncThunk(
  "board/updateBoard",
  async (updateBoard: Board) => {
    try {
      const res = await axios.put(
        `${API_BOARD}/${updateBoard.id}`,
        updateBoard
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataBoard.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchDataBoard.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.boards = action.payload;
      })
      .addCase(fetchDataBoard.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })

      // thêm
      .addCase(addBoard.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.boards.push(action.payload);
      })
      .addCase(addBoard.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })

      // sửa
      .addCase(updateBoard.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const index = state.boards.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) {
          state.boards[index] = action.payload;
        }
      })
      .addCase(updateBoard.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default boardSlice.reducer;
