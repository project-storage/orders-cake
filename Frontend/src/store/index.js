import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import cakeSlice from "./slices/cakeSlice";
import degreeSlice from "./slices/degreeSlice";
import departmentSlice from "./slices/departmentSlice";
import groupSlice from "./slices/groupSlice";
import userSlice from "./slices/userSlice";
import orderSlice from "./slices/orderSlice";
import studentSlice from "./slices/studentSlice";
import statusSlice from "./slices/statusSlice";
import teamSlice from "./slices/teamSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cake: cakeSlice,
    degree: degreeSlice,
    department: departmentSlice,
    group: groupSlice,
    user: userSlice,
    order: orderSlice,
    student: studentSlice,
    status: statusSlice,
    team: teamSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // If using redux-persist
      },
    }),
});

export default store;