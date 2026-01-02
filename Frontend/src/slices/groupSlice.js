import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GroupService from "../services/groupService";

const initialState = {
  groups: [],
  groupInfo: null,
  loading: false,
  error: null,
};

// Async Thunks
export const fetchAllGroups = createAsyncThunk("groups/fetchAll", async () => {
  const response = await GroupService.getAll();
  return response.data.data;
});

export const fetchGroupById = createAsyncThunk(
  "groups/fetchById",
  async (id) => {
    const response = await GroupService.getById(id);
    return response.data.data[0];
  }
);

export const createGroup = createAsyncThunk(
  "groups/create",
  async (departmentData) => {
    const response = await GroupService.create(departmentData);
    return response.data.data;
  }
);

export const updateGroup = createAsyncThunk(
  "groups/update",
  async ({ id, updateData }) => {
    const response = await GroupService.updateById(id, updateData);
    return response.data.data;
  }
);

export const deleteGroup = createAsyncThunk(
  "groups/delete",
  async (id) => {
    await GroupService.deleteById(id);
    return id; // คืนค่า ID สำหรับลบออกจาก state
  }
);

export const fetchGroupInfo = createAsyncThunk(
  "groups/fetchGroupInfo",
  async () => {
    const response = await GroupService.getGroupInfo();
    return response;
  }
);

// Slice
const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchAllGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
      })
      .addCase(fetchAllGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch groups";
      })
      // fetch info
      .addCase(fetchGroupInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroupInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.groupInfo = action.payload; // จัดเก็บข้อมูลกลุ่มใน state
      })
      .addCase(fetchGroupInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch group info";
      })
      // fetch by id
      .addCase(fetchGroupById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroupById.fulfilled, (state, action) => {
        state.loading = false;
        state.groupInfo = action.payload;
      })
      .addCase(fetchGroupById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch group";
      })
      // create
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups.push(action.payload);
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create group";
      })
      // update
      .addCase(updateGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.groups.findIndex(
          (group) => group.id === action.payload.id
        );
        if (index !== -1) {
          state.groups[index] = action.payload;
        }
      })
      .addCase(
        updateGroup.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Failed to update group";
        }
      )
      // delete
      .addCase(deleteGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = state.groups.filter(
          (group) => group.id !== action.payload
        );
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete group";
      });
  },
});

// Export actions and reducer
export default groupSlice.reducer;
