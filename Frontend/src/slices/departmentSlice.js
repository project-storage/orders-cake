import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import DepartmentService from "../services/departmentService";

// Initial State
const initialState = {
  departments: [],
  department: null,
  loading: false,
  error: null,
};

// Async Thunk for fetching all departments
export const fetchDepartments = createAsyncThunk(
  "departments/fetchDepartments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await DepartmentService.getAll();
      return response.data.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch departments");
    }
  }
);

// Async Thunk for fetching department by ID
export const fetchDepartmentById = createAsyncThunk(
  "departments/fetchDepartmentById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await DepartmentService.getById(id);
      return response.data.data[0]; // Assuming the data is in an array and you need the first item
    } catch (error) {
      return rejectWithValue("Failed to fetch department by ID");
    }
  }
);

// Async Thunk for creating a department
export const createDepartment = createAsyncThunk(
  "departments/createDepartment",
  async (departmentData, { rejectWithValue }) => {
    try {
      const response = await DepartmentService.create(departmentData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue("Failed to create department");
    }
  }
);

// Async Thunk for updating department
export const updateDepartment = createAsyncThunk(
  "departments/updateDepartment",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await DepartmentService.updateById(id, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue("Failed to update department");
    }
  }
);

// Async Thunk for deleting department
export const deleteDepartment = createAsyncThunk(
  "departments/deleteDepartment",
  async (id, { rejectWithValue }) => {
    try {
      await DepartmentService.deleteById(id);
    } catch (error) {
      return rejectWithValue("Failed to delete department");
    }
  }
);

// Department Slice
const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all departments
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDepartments.fulfilled,
        (state, action) => {
          state.loading = false;
          state.departments = action.payload;
        }
      )
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch departments";
      })
      // Fetch department by ID
      .addCase(fetchDepartmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDepartmentById.fulfilled,
        (state, action) => {
          state.department = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        fetchDepartmentById.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch department by ID";
        }
      )
      // Create department
      .addCase(createDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createDepartment.fulfilled,
        (state, action) => {
          state.departments.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(
        createDepartment.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload || "Failed to create department";
        }
      )
      // Update department
      .addCase(updateDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateDepartment.fulfilled,
        (state, action) => {
          const index = state.departments.findIndex(
            (department) => department.id === action.payload.id
          );
          if (index !== -1) {
            state.departments[index] = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(
        updateDepartment.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload || "Failed to update department";
        }
      )
      // Delete department
      .addCase(deleteDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.departments = state.departments.filter(
          (department) => department.id !== action.meta.arg
        );
        state.loading = false;
      })
      .addCase(
        deleteDepartment.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload || "Failed to delete department";
        }
      );
  },
});

// Export the reducer to be used in the store
export default departmentSlice.reducer;
