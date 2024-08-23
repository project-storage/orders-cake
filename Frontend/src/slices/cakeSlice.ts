import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import CakeService from '../services/CakeService';

interface CakeData {
  id: string;
  cakeName: string;
  price: string;
}

interface CakeState {
  cakes: CakeData[];
  cake: CakeData | null;
  loading: boolean;
  error: string | null;
}

const initialState: CakeState = {
  cakes: [],
  cake: null,
  loading: false,
  error: null,
};

// Async actions (thunks)
export const fetchCakes = createAsyncThunk<CakeData[], void, { rejectValue: string }>(
  'cakes/fetchCakes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await CakeService.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch cakes');
    }
  }
);

export const fetchCakeById = createAsyncThunk<CakeData, string, { rejectValue: string }>(
  'cakes/fetchCakeById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await CakeService.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch cake by id');
    }
  }
);

export const createCake = createAsyncThunk<CakeData, CakeData, { rejectValue: string }>(
  'cakes/createCake',
  async (cakeData, { rejectWithValue }) => {
    try {
      const response = await CakeService.create(cakeData);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to create cake');
    }
  }
);

export const updateCake = createAsyncThunk<CakeData, { id: string; data: Partial<CakeData> }, { rejectValue: string }>(
  'cakes/updateCake',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await CakeService.updateById(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to update cake');
    }
  }
);

export const deleteCake = createAsyncThunk<void, string, { rejectValue: string }>(
  'cakes/deleteCake',
  async (id, { rejectWithValue }) => {
    try {
      await CakeService.deleteById(id);
    } catch (error) {
      return rejectWithValue('Failed to delete cake');
    }
  }
);

// Slice
const cakeSlice = createSlice({
  name: 'cakes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all cakes
      .addCase(fetchCakes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCakes.fulfilled, (state, action: PayloadAction<CakeData[]>) => {
        state.cakes = action.payload;
        state.loading = false;
      })
      .addCase(fetchCakes.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch cakes';
      })
      // Fetch cake by id
      .addCase(fetchCakeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCakeById.fulfilled, (state, action: PayloadAction<CakeData>) => {
        state.cake = action.payload;
        state.loading = false;
      })
      .addCase(fetchCakeById.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch cake by id';
      })
      // Create cake
      .addCase(createCake.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCake.fulfilled, (state, action: PayloadAction<CakeData>) => {
        state.cakes.push(action.payload);
        state.loading = false;
      })
      .addCase(createCake.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create cake';
      })
      // Update cake
      .addCase(updateCake.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCake.fulfilled, (state, action: PayloadAction<CakeData>) => {
        const index = state.cakes.findIndex((cake) => cake.id === action.payload.id);
        if (index !== -1) {
          state.cakes[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateCake.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update cake';
      })
      // Delete cake
      .addCase(deleteCake.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCake.fulfilled, (state, action: PayloadAction<void, string>) => {
        state.cakes = state.cakes.filter((cake) => cake.id !== action.meta.arg);
        state.loading = false;
      })
      .addCase(deleteCake.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete cake';
      });
  },
});

export default cakeSlice.reducer;
