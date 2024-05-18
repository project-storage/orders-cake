import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import DegreeService from '../services/DegreeService'

const initialState = {
    degrees: [],
    degree: null,
    loading: false,
    error: null
}

export const fetchDegrees = createAsyncThunk('degrees/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const response = await DegreeService.getAll()
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response.data.data)
    }
})

export const degreeById = createAsyncThunk('degrees/getById', async (id, { rejectWithValue }) => {
    try {
        const response = await DegreeService.getById(id)
        return response.data.data[0]
    } catch (error) {
        return rejectWithValue(error.response.data.data)
    }
})

export const createDegree = createAsyncThunk('degrees/create', async (degreeData, { rejectWithValue }) => {
    try {
        const response = await DegreeService.create(degreeData)
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response.data.data)
    }
})

export const updateDegree = createAsyncThunk('degrees/update', async ({ id, degreeName }, { rejectWithValue }) => {
    try {
        const response = await DegreeService.updateById(id, { degreeName })
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response.data.data)
    }
})

export const deleteDegree = createAsyncThunk('degrees/delete', async (id, { rejectWithValue }) => {
    try {
        await DegreeService.deleteById(id)
        return id
    } catch (error) {
        return rejectWithValue(error.response.data.data)
    }
})

const degreeSlice = createSlice({
    name: 'degrees',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get all
            .addCase(fetchDegrees.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchDegrees.fulfilled, (state, action) => {
                state.loading = false
                state.degrees = action.payload
            })
            .addCase(fetchDegrees.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // get by id
            .addCase(degreeById.pending, (state) => {
                state.loading = true
            })
            .addCase(degreeById.fulfilled, (state, action) => {
                state.loading = false
                state.degree = action.payload
            })
            .addCase(degreeById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // create
            .addCase(createDegree.pending, (state) => {
                state.loading = true
            })
            .addCase(createDegree.fulfilled, (state, action) => {
                state.loading = false
                state.degrees.push(action.payload)
            })
            .addCase(createDegree.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // update
            .addCase(updateDegree.pending, (state) => {
                state.loading = true
            })
            .addCase(updateDegree.fulfilled, (state, action) => {
                state.loading = false
                state.degrees = state.degrees.map(degree => 
                    degree.id === action.payload.id ? action.payload : degree
                )
            })
            .addCase(updateDegree.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // delete
            .addCase(deleteDegree.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteDegree.fulfilled, (state, action) => {
                state.loading = false
                state.degrees = state.degrees.filter(degree => degree.id !== action.payload)
            })
            .addCase(deleteDegree.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default degreeSlice.reducer
