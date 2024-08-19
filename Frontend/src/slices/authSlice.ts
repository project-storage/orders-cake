import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "../services/authService";


// กำหนดประเภทของสถานะ
interface AuthState {
  auths: any[]; // แทนที่ `any` ด้วยประเภทที่เฉพาะเจาะจงหากเป็นไปได้
  auth: any | null; // แทนที่ `any` ด้วยประเภทที่เฉพาะเจาะจงหรือตัวอินเตอร์เฟซ
  loading: boolean;
  error: string | null;
}

// กำหนดค่าเริ่มต้นของสถานะ
const initialState: AuthState = {
  auths: [],
  auth: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (loginData: { username: string; email: string; password: string }) => {
    const response = await authService.Login(loginData);
    return response.data;
  }
);

// สร้าง slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.auth = null;
      state.auths = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.auth = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      });
  },
});

// ส่งออก actions และ reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
