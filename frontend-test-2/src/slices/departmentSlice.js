import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import DepartmentService from '../services/DepartmentService'

const initialState = {
    departments: [],
    loading: false,
    error: null,
}

export const fetchDepartments = createAsyncThunk('departments/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const response = await DepartmentService.getAll()
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response.data.data)
    }
})

export const createDepartment = createAsyncThunk('department/create', async (departmentData, { rejectWithValue }) => {
    try {
        const response = await DepartmentService.create(departmentData)
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response.data.data)
    }
})

export const deleteDepartment = createAsyncThunk('department/delete', async (id, { rejectWithValue }) => {
    try {
        await DepartmentService.deleteById(id)
        return id
    } catch (error) {
        return rejectWithValue(error.response.data.data)
    }
})

const departmentSlice = createSlice({
    name: 'departments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDepartments.fulfilled, (state, action) => {
                state.loading = false;
                state.departments = action.payload;
            })
            .addCase(fetchDepartments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createDepartment.pending, (state) => {
                state.loading = true;
            })
            .addCase(createDepartment.fulfilled, (state, action) => {
                state.loading = false;
                state.departments.push(action.payload);
            })
            .addCase(createDepartment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteDepartment.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteDepartment.fulfilled, (state, action) => {
                state.loading = false;
                state.departments = state.departments.filter(department => department.id !== action.payload);
            })
            .addCase(deleteDepartment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default departmentSlice.reducer