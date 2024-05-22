import { configureStore } from '@reduxjs/toolkit';
import cakeReducer from '../slices/cakeSlice';
import departmentReducer from '../slices/departmentSlice';
import degreeReducer from '../slices/degreeSlice'
import groupReducer from '../slices/groupSlice'

export const store = configureStore({
  reducer: {
    cakes: cakeReducer,
    departments: departmentReducer,
    degrees: degreeReducer,
    group: groupReducer
  },
});
