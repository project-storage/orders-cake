import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import teamService from "../services/teamService";

// กำหนดค่าเริ่มต้นของสถานะ
const initialState = {
  teams: [],
  team: null,
  loading: false,
  error: null,
};

// Async thunks for team operations
export const createTeam = createAsyncThunk(
  "team/createTeam",
  async (teamData, { rejectWithValue }) => {
    try {
      const response = await teamService.createTeam(teamData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getTeamInfo = createAsyncThunk(
  "team/getTeamInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await teamService.getTeamInfo();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getTeamAll = createAsyncThunk(
  "team/getTeamAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await teamService.getTeamAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const searchTeam = createAsyncThunk(
  "team/searchTeam",
  async (query, { rejectWithValue }) => {
    try {
      const response = await teamService.searchTeam(query);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateTeam = createAsyncThunk(
  "team/updateTeam",
  async ({ id, teamData }, { rejectWithValue }) => {
    try {
      const response = await teamService.updateTeam(id, teamData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteTeam = createAsyncThunk(
  "team/deleteTeam",
  async (id, { rejectWithValue }) => {
    try {
      const response = await teamService.deleteTeam(id);
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// สร้าง slice
const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    clearTeam: (state) => {
      state.team = null;
    },
    clearTeams: (state) => {
      state.teams = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Team
      .addCase(createTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.teams.push(action.payload.data.team);
        }
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Create team failed";
      })
      // Get Team Info
      .addCase(getTeamInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeamInfo.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.team = action.payload.data;
        }
      })
      .addCase(getTeamInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Get team info failed";
      })
      // Get All Teams
      .addCase(getTeamAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeamAll.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.teams = action.payload.data;
        }
      })
      .addCase(getTeamAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Get all teams failed";
      })
      // Search Team
      .addCase(searchTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchTeam.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.teams = action.payload.data;
        }
      })
      .addCase(searchTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Search team failed";
      })
      // Update Team
      .addCase(updateTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          const index = state.teams.findIndex(team => team.id === action.payload.data.id);
          if (index !== -1) {
            state.teams[index] = action.payload.data;
          }
          if (state.team && state.team.id === action.payload.data.id) {
            state.team = action.payload.data;
          }
        }
      })
      .addCase(updateTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Update team failed";
      })
      // Delete Team
      .addCase(deleteTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = state.teams.filter(team => team.id !== action.meta.arg);
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Delete team failed";
      });
  },
});

// ส่งออก actions และ reducer
export const { clearTeam, clearTeams } = teamSlice.actions;
export default teamSlice.reducer;