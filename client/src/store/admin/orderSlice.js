import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverURL } from "@/config/config";

const initialState = {
  isLoading: false,
  orderList: [],
  orderDetails: null,
};

export const getAllOrdersOfAllUser = createAsyncThunk(
  "/orders/getAllOrdersOfAllUser",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${serverURL}/api/admin/orders/get`);
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch orders");
    }
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "/orders/getOrderDetailsForAdmin",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `${serverURL}/api/admin/orders/details/${id}`
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch order details"
      );
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/orders/updateOrderStatus",
  async ({ id, orderStatus }, { rejectWithValue }) => {
    try {
      const result = await axios.put(
        `${serverURL}/api/admin/orders/update/${id}`,
        { orderStatus }
      );
      return result?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update order status"
      );
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrdersOfAllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersOfAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersOfAllUser.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
