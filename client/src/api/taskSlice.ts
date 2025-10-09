import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Task } from "../utils/Types";
import axios from "axios";

const API_TASK = "http://localhost:3000/tasks";

interface TaskState {
  status: "idle" | "pending" | "fulfilled" | "rejected";
  tasks: Task[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

const initialState: TaskState = {
  status: "idle",
  tasks: [],
  error: null,
};

export const fetchTask = createAsyncThunk("task/fetchTask", async () => {
  try {
    const res = await axios.get(API_TASK);
    return res.data;
  } catch (error) {
    return error;
  }
});

export const addTask = createAsyncThunk(
  "task/addTask",
  async (newTask: Omit<Task, "id">) => {
    try {
      const res = await axios.post(API_TASK, newTask);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId: number) => {
    try {
      await axios.delete(`${API_TASK}/${taskId}`);
      return taskId;
    } catch (error) {
      return error;
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (updatedTask: Task) => {
    try {
      const res = await axios.put(`${API_TASK}/${updatedTask.id}`, updatedTask);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const deleteTasksByListId = createAsyncThunk(
  "task/deleteTasksByListId",
  async (listId: number) => {
    try {
      const res = await axios.get(API_TASK);
      const tasks = res.data.filter((t: Task) => t.list_id === listId);
      // thêm promise để chạy song song ( bất đồng bộ)
      await Promise.all(
        tasks.map((t: Task) => axios.delete(`${API_TASK}/${t.id}`))
      );
      return listId;
    } catch (error) {
      return error;
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTask.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })

      // thêm task
      .addCase(addTask.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })

      // xóa task
      .addCase(deleteTask.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })

      // update task
      .addCase(updateTask.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })

      // xóa task khi list bị xóa
      .addCase(deleteTasksByListId.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteTasksByListId.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.list_id !== action.payload);
      })
      .addCase(deleteTasksByListId.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
