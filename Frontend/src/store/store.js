import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"; // นำเข้า slice reducer
import userReducer from "../slices/userSlice"; // นำเข้า slice reducer
import cakeReducer from "../slices/cakeSlice";
import departmentReducer from "../slices/departmentSlice";
import degreeReducer from "../slices/degreeSlice";
import groupReducer from "../slices/groupSlice";
import orderReducer from "../slices/orderSlice";
import studentReducer from "../slices/studentSlice";
import statusReducer from "../slices/statusSlice";
import teamReducer from "../slices/teamSlice";
// ตั้งค่า store
export const store = configureStore({
  reducer: {
    auth: authReducer, // เพิ่ม slice reducer ที่นี่
    user: userReducer,
    cakes: cakeReducer,
    departments: departmentReducer,
    degrees: degreeReducer,
    groups: groupReducer,
    order: orderReducer,
    student: studentReducer,
    status: statusReducer,
    team: teamReducer,
  },
});
