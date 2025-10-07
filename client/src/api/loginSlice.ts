const API_USER = "http://localhost:3000/users";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../utils/Types";
import axios from "axios";

interface LoginState {
  status: "idle" | "pending" | "fulfilled" | "rejected";
  users: User[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

const initialState: LoginState = {
  status: "idle",
  users: [],
  error: null,
};

export const fetchData = createAsyncThunk("user/fetch", async () => {
  try {
    const res = await axios.get(API_USER);
    return res.data;
  } catch (error) {
    return error;
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.users = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default loginSlice.reducer;
