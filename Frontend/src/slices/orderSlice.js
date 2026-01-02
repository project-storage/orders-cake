import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "../services/orderService";

// กำหนดค่าเริ่มต้นของสถานะ
const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
};

// Async thunks for order operations
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await orderService.createOrder(orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderService.getAllOrders();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await orderService.getOrderById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ id, orderData }, { rejectWithValue }) => {
    try {
      const response = await orderService.updateOrder(id, orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await orderService.deleteOrder(id);
      return { id, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getOrdersByStudentId = createAsyncThunk(
  "order/getOrdersByStudentId",
  async (stuID, { rejectWithValue }) => {
    try {
      const response = await orderService.getOrdersByStudentId(stuID);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// สร้าง slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.orders.unshift(action.payload.data);
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Create order failed";
      })
      // Get All Orders
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.orders = action.payload.data;
        }
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Get all orders failed";
      })
      // Get Order By ID
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.order = action.payload.data;
        }
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Get order by ID failed";
      })
      // Update Order
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          const index = state.orders.findIndex(order => order.id === action.payload.data.id);
          if (index !== -1) {
            state.orders[index] = action.payload.data;
          }
          if (state.order && state.order.id === action.payload.data.id) {
            state.order = action.payload.data;
          }
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Update order failed";
      })
      // Delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(order => order.id !== action.meta.arg);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Delete order failed";
      })
      // Get Orders By Student ID
      .addCase(getOrdersByStudentId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersByStudentId.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.data) {
          state.orders = action.payload.data;
        }
      })
      .addCase(getOrdersByStudentId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Get orders by student ID failed";
      });
  },
});

// ส่งออก actions และ reducer
export const { clearOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;