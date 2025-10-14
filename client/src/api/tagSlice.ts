import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Tag } from "../utils/Types";

const API_URL = "http://localhost:3000/tags";

interface TagState {
  tags: Tag[];
  status: "idle" | "loading" | "succeeded" | "failed";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

const initialState: TagState = {
  tags: [],
  status: "idle",
  error: null,
};

// Lấy danh sách tag
export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

// Tạo tag mới
export const addTag = createAsyncThunk(
  "tags/addTag",
  async (newTag: Omit<Tag, "id">) => {
    const res = await axios.post(API_URL, newTag);
    return res.data;
  }
);

// Sửa tag
export const updateTag = createAsyncThunk(
  "tags/updateTag",
  async (tag: Tag) => {
    const res = await axios.put(`${API_URL}/${tag.id}`, tag);
    return res.data;
  }
);

// Xóa tag
export const deleteTag = createAsyncThunk(
  "tags/deleteTag",
  async (tagId: number) => {
    await axios.delete(`${API_URL}/${tagId}`);
    return tagId;
  }
);

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags = action.payload;
      })
      .addCase(addTag.fulfilled, (state, action) => {
        state.tags.push(action.payload);
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        const i = state.tags.findIndex((t) => t.id === action.payload.id);
        if (i !== -1) state.tags[i] = action.payload;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.tags = state.tags.filter((t) => t.id !== action.payload);
      });
  },
});

export default tagSlice.reducer;
