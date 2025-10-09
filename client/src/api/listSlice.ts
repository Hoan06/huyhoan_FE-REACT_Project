import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { List } from "../utils/Types";
import axios from "axios";

const API_LIST = "http://localhost:3000/lists";

interface ListState {
  status: "idle" | "pending" | "fulfilled" | "rejected";
  lists: List[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

const initialState: ListState = {
  status: "idle",
  lists: [],
  error: null,
};

export const fetchList = createAsyncThunk("list/fetchList", async () => {
  try {
    const res = await axios.get(API_LIST);
    return res.data;
  } catch (error) {
    return error;
  }
});

export const addList = createAsyncThunk(
  "list/addList",
  async (newList: Omit<List, "id">) => {
    try {
      const res = await axios.post(API_LIST, newList);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const updateList = createAsyncThunk(
  "list/updateList",
  async (updatedList: List) => {
    try {
      const res = await axios.put(`${API_LIST}/${updatedList.id}`, updatedList);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteList = createAsyncThunk(
  "list/deleteList",
  async (listId: number) => {
    try {
      await axios.delete(`${API_LIST}/${listId}`);
      return listId;
    } catch (error) {
      return error;
    }
  }
);

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        state.lists = action.payload;
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })

      // thêm list
      .addCase(addList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addList.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.lists.push(action.payload);
      })
      .addCase(addList.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })

      // update list
      .addCase(updateList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateList.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const index = state.lists.findIndex((l) => l.id === action.payload.id);
        if (index !== -1) {
          state.lists[index] = action.payload;
        }
      })
      .addCase(updateList.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })

      // xóa list
      .addCase(deleteList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteList.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.lists = state.lists.filter((l) => l.id !== action.payload);
      })
      .addCase(deleteList.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default listSlice.reducer;
