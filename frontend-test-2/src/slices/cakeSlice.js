import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CakeService from '../services/CakeService';

const initialState = {
  cakes: [],
  loading: false,
  error: null,
};

export const fetchCakes = createAsyncThunk('cakes/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await CakeService.getAll();
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data.data);
  }
});

export const createCake = createAsyncThunk('cakes/create', async (cakeData, { rejectWithValue }) => {
  try {
    const response = await CakeService.create(cakeData);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data.data);
  }
});

export const deleteCake = createAsyncThunk('cakes/delete', async (id, { rejectWithValue }) => {
  try {
    await CakeService.deleteById(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data.data);
  }
});

const cakeSlice = createSlice({
  name: 'cakes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCakes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCakes.fulfilled, (state, action) => {
        state.loading = false;
        state.cakes = action.payload;
      })
      .addCase(fetchCakes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCake.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCake.fulfilled, (state, action) => {
        state.loading = false;
        state.cakes.push(action.payload);
      })
      .addCase(createCake.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCake.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCake.fulfilled, (state, action) => {
        state.loading = false;
        state.cakes = state.cakes.filter(cake => cake.id !== action.payload);
      })
      .addCase(deleteCake.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cakeSlice.reducer;