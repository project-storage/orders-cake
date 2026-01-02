import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import statusService from "../services/statusService";

// กำหนดค่าเริ่มต้นของสถานะ
const initialState = {
  statuses: [],
  status: null,
  loading: false,
  error: null,
};

// Async thunks for status operations
export const getStatusAll = createAsyncThunk(
  "status/getStatusAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await statusService.getStatusAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createStatus = createAsyncThunk(
  "status/createStatus",
  async (statusData, { rejectWithValue }) => {
    try {
      const response = await statusService.createStatus(statusData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateStatus = createAsyncThunk(
  "status/updateStatus",
  async ({ id, statusData }, { rejectWithValue }) => {
    try {
      const response = await statusService.updateStatus(id, statusData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteStatus = createAsyncThunk(
  "status/deleteStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await statusService.deleteStatus(id);
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// สร้าง slice
const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.status = null;
    },
    clearStatuses: (state) => {
      state.statuses = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Statuses
      .addCase(getStatusAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStatusAll.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.statuses = action.payload.data;
        }
      })
      .addCase(getStatusAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Get all statuses failed";
      })
      // Create Status
      .addCase(createStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStatus.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.statuses.push(action.payload.data);
        }
      })
      .addCase(createStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Create status failed";
      })
      // Update Status
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          const index = state.statuses.findIndex(status => status.id === action.payload.data.id);
          if (index !== -1) {
            state.statuses[index] = action.payload.data;
          }
          if (state.status && state.status.id === action.payload.data.id) {
            state.status = action.payload.data;
          }
        }
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Update status failed";
      })
      // Delete Status
      .addCase(deleteStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.statuses = state.statuses.filter(status => status.id !== action.meta.arg);
      })
      .addCase(deleteStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Delete status failed";
      });
  },
});

// ส่งออก actions และ reducer
export const { clearStatus, clearStatuses } = statusSlice.actions;
export default statusSlice.reducer;