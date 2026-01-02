import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentService from "../services/studentService";

// กำหนดค่าเริ่มต้นของสถานะ
const initialState = {
  students: [],
  student: null,
  loading: false,
  error: null,
};

// Async thunks for student operations
export const createStudent = createAsyncThunk(
  "student/createStudent",
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await studentService.createStudent(studentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getStudentInfo = createAsyncThunk(
  "student/getStudentInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await studentService.getStudentInfo();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getStudentAll = createAsyncThunk(
  "student/getStudentAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await studentService.getStudentAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const searchStudent = createAsyncThunk(
  "student/searchStudent",
  async (query, { rejectWithValue }) => {
    try {
      const response = await studentService.searchStudent(query);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateStudent = createAsyncThunk(
  "student/updateStudent",
  async ({ id, studentData }, { rejectWithValue }) => {
    try {
      const response = await studentService.updateStudent(id, studentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "student/deleteStudent",
  async (id, { rejectWithValue }) => {
    try {
      const response = await studentService.deleteStudent(id);
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// สร้าง slice
const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    clearStudent: (state) => {
      state.student = null;
    },
    clearStudents: (state) => {
      state.students = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Student
      .addCase(createStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.students.push(action.payload.data);
        }
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Create student failed";
      })
      // Get Student Info
      .addCase(getStudentInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentInfo.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.student = action.payload.data;
        }
      })
      .addCase(getStudentInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Get student info failed";
      })
      // Get All Students
      .addCase(getStudentAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentAll.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.students = action.payload.data;
        }
      })
      .addCase(getStudentAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Get all students failed";
      })
      // Search Student
      .addCase(searchStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchStudent.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.students = action.payload.data;
        }
      })
      .addCase(searchStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Search student failed";
      })
      // Update Student
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          const index = state.students.findIndex(student => student.id === action.payload.data.id);
          if (index !== -1) {
            state.students[index] = action.payload.data;
          }
          if (state.student && state.student.id === action.payload.data.id) {
            state.student = action.payload.data;
          }
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Update student failed";
      })
      // Delete Student
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(student => student.id !== action.meta.arg);
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Delete student failed";
      });
  },
});

// ส่งออก actions และ reducer
export const { clearStudent, clearStudents } = studentSlice.actions;
export default studentSlice.reducer;