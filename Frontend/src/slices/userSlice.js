import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

// กำหนดค่าเริ่มต้นของสถานะ
const initialState = {
  users: [],
  user: null,
  loading: false,
  error: null,
};

// Async thunks for user operations
export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getUserInfo();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getUserAll = createAsyncThunk(
  "user/getUserAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getUserAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const searchUser = createAsyncThunk(
  "user/searchUser",
  async (query, { rejectWithValue }) => {
    try {
      const response = await userService.searchUser(query);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await userService.updateUser(id, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await userService.deleteUser(id);
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// สร้าง slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
    clearUsers: (state) => {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Get User Info
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.user = action.payload.data;
        }
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Get user info failed";
      })
      // Get All Users
      .addCase(getUserAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAll.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.users = action.payload.data;
        }
      })
      .addCase(getUserAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Get all users failed";
      })
      // Search User
      .addCase(searchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.users = action.payload.data;
        }
      })
      .addCase(searchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Search user failed";
      })
      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          const index = state.users.findIndex(user => user.id === action.payload.data.id);
          if (index !== -1) {
            state.users[index] = action.payload.data;
          }
          if (state.user && state.user.id === action.payload.data.id) {
            state.user = action.payload.data;
          }
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Update user failed";
      })
      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(user => user.id !== action.meta.arg);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Delete user failed";
      });
  },
});

// ส่งออก actions และ reducer
export const { clearUser, clearUsers } = userSlice.actions;
export default userSlice.reducer;