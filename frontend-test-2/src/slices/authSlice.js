// authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import AuthService from "../services/AuthService";

const initialState = {
    auths: [], // Ensure this is the array you want to use
    auth: null,
    loading: false,
    error: null
}

export const Register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
        const response = await AuthService.Register(userData);
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response.data.data);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // create
            .addCase(Register.pending, (state) => {
                state.loading = true;
            })
            .addCase(Register.fulfilled, (state, action) => {
                state.loading = false;
                state.auths.push(action.payload); // Use auths here
            })
            .addCase(Register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const { resetError } = authSlice.actions;

export default authSlice.reducer;
