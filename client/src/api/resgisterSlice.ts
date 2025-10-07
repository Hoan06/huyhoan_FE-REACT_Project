import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type User } from "../utils/Types";
import axios from "axios";

const API_USER = "http://localhost:3000/users";

interface UserState {
  status: "idle" | "pending" | "fulfilled" | "rejected";
  users: User[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

const initialState: UserState = {
  status: "idle",
  users: [],
  error: null,
};

export const fetchUsers = createAsyncThunk("user/fetch", async () => {
  const res = await axios.get(API_USER);
  return res.data;
});

export const resgisterUser = createAsyncThunk(
  "user/resgister",
  async (newUser: Omit<User, "id" | "created_at">) => {
    const res = await axios.post(API_USER, {
      ...newUser,
      created_at: new Date().toISOString(),
    });
    return res.data;
  }
);

const resgisterSlice = createSlice({
  name: "resgister",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(resgisterUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(resgisterUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.users.push(action.payload);
      })
      .addCase(resgisterUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default resgisterSlice.reducer;
