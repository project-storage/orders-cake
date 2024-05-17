import { configureStore } from '@reduxjs/toolkit';
import cakeReducer from '../slices/cakeSlice';
import departmentReducer from '../slices/departmentSlice';

export const store = configureStore({
  reducer: {
    cakes: cakeReducer,
    departments: departmentReducer
  },
});
