// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../services/UserService'; // Adjust the path as necessary

const initialState = {
    users: [],
    user: null,
    loading: false,
    error: null
};

// Thunks for async actions
export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async (_, { rejectWithValue }) => {
    try {
        const response = await UserService.getUserInfo();
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response.data.data);
    }
});

export const fetchUserById = createAsyncThunk('user/fetchUserById', async (id, { rejectWithValue }) => {
    try {
        const response = await UserService.getUserById(id);
        return response.data.data[0]
    } catch (error) {
        return rejectWithValue(error.response.data.data);
    }
});

export const fetchUseTeacher = createAsyncThunk('user/fetchUseTeacher', async (_, { rejectWithValue }) => {
    try {
        const response = await UserService.getUseTeacher();
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response.data.data);
    }
});

export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await UserService.getAllUser();
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response.data.data);
    }
});

export const createUser = createAsyncThunk('user/createUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await UserService.createUser(userData);
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response.data.data);
    }
});

export const updateUser = createAsyncThunk('user/updateUser', async ({ id, userData }, { rejectWithValue }) => {
    try {
        const response = await UserService.updateUser(id, userData);
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response.data.data);
    }
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (id, { rejectWithValue }) => {
    try {
        const response = await UserService.deleteUser(id);
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response.data.data);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // get info
            .addCase(fetchUserInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // get by id
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add case for fetching users with role 'ครูที่ปรึกษา'
            .addCase(fetchUseTeacher.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUseTeacher.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload; // Assign the entire array to state.users
            })
            .addCase(fetchUseTeacher.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // get all
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // create
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // update
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // delete
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(user => user.id !== action.payload.id);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default userSlice.reducer;
