import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import GroupService from '../services/GroupService'

const initialState = {
    groups: [],
    group: null,
    loading: false,
    error: null
}

export const fetchGroups = createAsyncThunk('groups/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const response = await GroupService.getAll()
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response.data.data)
    }
})

export const groupById = createAsyncThunk('group/getById', async (id, { rejectWithValue }) => {
    try {
        const response = await GroupService.getById(id)
        return response.data.data[0]
    } catch (error) {
        return rejectWithValue(error.response.data.data)
    }
})

export const createGroup = createAsyncThunk('group/create', async (groupData, { rejectWithValue }) => {
    try {
        const response = await GroupService.create(groupData)
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response.data.data);
    }
})

export const updateGroup = createAsyncThunk('group/update', async ({ id, roomName, teachID, departID, degreeID }) => {
    try {
        const response = await GroupService.updateById(id, { roomName, teachID, departID, degreeID })
        return response.data.data
    } catch (error) {
        return rejectWithValue(error.response.data.data);
    }
})

export const deleteGroup = createAsyncThunk('group/delete', async (id, { rejectWithValue }) => {
    try {
        await GroupService.deleteById(id)
        return id
    } catch (error) {
        return rejectWithValue(error.response.data.data)
    }
})

const groupSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get all
            .addCase(fetchGroups.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchGroups.fulfilled, (state, action) => {
                state.loading = false
                state.groups = action.payload
            })
            .addCase(fetchGroups.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            // get by id
            .addCase(groupById.pending, (state) => {
                state.loading = true
            })
            .addCase(groupById.fulfilled, (state, action) => {
                state.loading = false,
                    state.group = action.payload
            })
            .addCase(groupById.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            // create
            .addCase(createGroup.pending, (state) => {
                state.loading = true
            })
            .addCase(createGroup.fulfilled, (state, action) => {
                state.loading = false,
                    state.groups.push(action.payload)
            })
            .addCase(createGroup.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            // update
            .addCase(updateGroup.pending, (state) => {
                state.loading = true
            })
            .addCase(updateGroup.fulfilled, (state, action) => {
                state.loading = false,
                    state.group = action.payload,
                    state.groups = state.groups.map(group =>
                        group.id === action.payload.id ? action.payload : group
                    )
            })
            .addCase(updateGroup.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            // delete
            .addCase(deleteGroup.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteGroup.fulfilled, (state) => {
                state.loading = false,
                    state.groups = state.groups.filter(group => group.id !== action.payload)
            })
            .addCase(deleteGroup.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
    }
})

export default groupSlice.reducer