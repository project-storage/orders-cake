import userService from "../services/userService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Define TypeScript interfaces for the state and payloads
interface UserData {
  id: string;
  title: string;
  name: string;
  surname: string;
  tel: string;
  email: string;
  username: string;
  password: string;
  role: string;
}

interface UserState {
  users: UserData[];
  user: UserData | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  user: null,
  loading: false,
  error: null,
};

// Thunks for async actions
export const fetchUserInfo = createAsyncThunk<
  UserData,
  void,
  { rejectValue: string }
>("user/fetchUserInfo", async (_, { rejectWithValue }) => {
  try {
    const response = await userService.getUserInfo();
    return response.data.data; // Adjust if needed
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch user info"
    );
  }
});

export const fetchUserById = createAsyncThunk<
  UserData,
  string,
  { rejectValue: string }
>("user/fetchUserById", async (id, { rejectWithValue }) => {
  try {
    const response = await userService.getUserById(id);
    return response.data.data[0]; // Adjust if needed
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch user by ID"
    );
  }
});

export const fetchUseTeacher = createAsyncThunk<
  UserData[],
  void,
  { rejectValue: string }
>("user/fetchUseTeacher", async (_, { rejectWithValue }) => {
  try {
    const response = await userService.getUseTeacher();
    return response.data.data; // Adjust if needed
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch teachers"
    );
  }
});

export const fetchAllUsers = createAsyncThunk<
  UserData[],
  void,
  { rejectValue: string }
>("user/fetchAllUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await userService.getAllUser();
    return response.data.data; // Adjust if needed
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch all users"
    );
  }
});

export const updateUser = createAsyncThunk<
  UserData,
  { id: string; userData: Partial<UserData> },
  { rejectValue: string }
>("user/updateUser", async ({ id, userData }, { rejectWithValue }) => {
  try {
    const response = await userService.updateUser(id, userData);
    return response.data.data; // Adjust if needed
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update user"
    );
  }
});

export const deleteUser = createAsyncThunk<
  { id: string },
  string,
  { rejectValue: string }
>("user/deleteUser", async (id, { rejectWithValue }) => {
  try {
    await userService.deleteUser(id);
    return { id };
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to delete user"
    );
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user info
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch user by ID
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch teachers
      .addCase(fetchUseTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUseTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUseTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch all users
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        } else {
          state.users.push(action.payload);
        }
        if (state.user && state.user.id === action.payload.id) {
          state.user = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(
          (user) => user.id !== action.payload.id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
