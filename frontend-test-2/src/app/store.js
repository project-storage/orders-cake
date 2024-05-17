import { configureStore } from '@reduxjs/toolkit';
import cakeReducer from '../slices/cakeSlice';

export const store = configureStore({
  reducer: {
    cakes: cakeReducer,
  },
});
