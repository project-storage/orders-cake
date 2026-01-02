import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import DegreeService from "../services/degreeService";

const initialState = {
  degrees: [],
  degree: null,
  loading: false,
  error: null,
};

export const fetchDegrees = createAsyncThunk(
  "degrees/fetchDegrees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await DegreeService.getAll();
      return response.data.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch degree");
    }
  }
);

export const fetchDegreesById = createAsyncThunk(
  "degrees/fetchDegreeById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await DegreeService.getById(id);
      return res.data.data[0];
    } catch (error) {
      return rejectWithValue("Failed to fetch degree by ID");
    }
  }
);

export const createDegree = createAsyncThunk(
  "degrees/createDegree",
  async (DegreeData, { rejectWithValue }) => {
    try {
      const res = await DegreeService.create(DegreeData);
      return res.data.data;
    } catch (error) {
      return rejectWithValue("Failed to create degree");
    }
  }
);

export const updateDegree = createAsyncThunk(
  "degrees/updateDegree",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await DegreeService.updateById(id, data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue("Failed to update degree");
    }
  }
);

export const deleteDegree = createAsyncThunk(
  "degrees/deleteDegree",
  async (id, { rejectWithValue }) => {
    try {
      await DegreeService.deleteById(id);
    } catch (error) {
      return rejectWithValue("Failed to delete degree");
    }
  }
);

const degreeSlice = createSlice({
  name: "degree",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // fetch all degree
      .addCase(fetchDegrees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDegrees.fulfilled,
        (state, action) => {
          state.loading = false;
          state.degrees = action.payload;
        }
      )
      .addCase(fetchDegrees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch degree";
      })
      // fetch degree by id
      .addCase(fetchDegreesById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDegreesById.fulfilled,
        (state, action) => {
          state.degree = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchDegreesById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch degree by ID";
      })
      // create degree
      .addCase(createDegree.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createDegree.fulfilled,
        (state, action) => {
          state.degrees.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(createDegree.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create degree";
      })
      // update degree
      .addCase(updateDegree.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateDegree.fulfilled,
        (state, action) => {
          const index = state.degrees.findIndex(
            (degree) => degree.id === action.payload.id
          );
          if (index !== -1) {
            state.degrees[index] = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(updateDegree.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update degree";
      })
      // delete degree
      .addCase(deleteDegree.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDegree.fulfilled, (state, action) => {
        state.degrees = state.degrees.filter(
          (degree) => degree.id !== action.meta.arg
        );
        state.loading = false;
      })
      .addCase(deleteDegree.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete degree";
      });
  },
});

export default degreeSlice.reducer;
