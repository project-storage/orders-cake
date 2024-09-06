import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"; // นำเข้า slice reducer
import userReducer from "../slices/userSlice"; // นำเข้า slice reducer
import cakeReducer from "../slices/cakeSlice";
import departmentReducer from "../slices/departmentSlice";
import degreeReducer from "../slices/degreeSlice";

// ตั้งค่า store
export const store = configureStore({
  reducer: {
    auth: authReducer, // เพิ่ม slice reducer ที่นี่
    user: userReducer,
    cakes: cakeReducer,
    departments: departmentReducer,
    degrees: degreeReducer,
  },
});

// ประเภทของ state ของ store
export type RootState = ReturnType<typeof store.getState>;

// ประเภทของฟังก์ชัน dispatch ของ store
export type AppDispatch = typeof store.dispatch;
