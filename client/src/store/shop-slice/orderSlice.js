import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverURL } from "@/config/config";
import { act } from "react";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${serverURL}/api/shop/order/create`,
        orderData
      );

      return response?.data;
    } catch (error) {
      console.error(
        "Error in create order:",
        error?.response?.data || error.message
      );
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({ paymentId, orderId, razorpay_signature, payerId }) => {
    try {
      const response = await axios.post(`${serverURL}/api/shop/order/capture`, {
        paymentId,
        orderId,
        razorpay_signature,
        payerId,
      });

      return response.data;
    } catch (error) {
      console.log("payment capture error", error);
    }
  }
);

export const getAllOrdersByUser = createAsyncThunk(
  "/order/getAllOrdersByUser",
  async (clerkId) => {
    try {
      const response = await axios.get(
        `${serverURL}/api/shop/order/list/${clerkId}`
      );
      return response.data;
    } catch (error) {
      console.log("error while fetching orders", error);
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    try {
      const response = await axios.get(
        `${serverURL}/api/shop/order/details/${id}`
      );
      return response.data;
    } catch (error) {
      console.log("payment capture error", error);
    }
  }
);

const shoppingOrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrderDetalis: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(getAllOrdersByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUser.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetalis } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;
