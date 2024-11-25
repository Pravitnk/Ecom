import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/shop/address/add`,
        formData
      );

      return response?.data;
    } catch (error) {
      console.error(
        "Error in addToCart:",
        error?.response?.data || error.message
      );
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const getAllAddress = createAsyncThunk(
  "address/getAllAddress",
  async (clerkId) => {
    const result = await axios.get(
      `http://localhost:4000/api/shop/address/get/${clerkId}`
    );
    return result?.data;
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ clerkId, addressId, formData }) => {
    const result = await axios.put(
      `http://localhost:4000/api/shop/address/update`,
      formData
    );

    return result?.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async ({ clerkId, addressId }) => {
    const result = await axios.delete(
      `http://localhost:4000/api/shop/address/delete/${clerkId}/${addressId}`
    );
    return result?.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.addressList = action.payload.data;
      })
      .addCase(addAddress.rejected, (state) => {
        state.isLoading = false;
        // state.addressList = [];
      })
      .addCase(getAllAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(getAllAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(updateAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(updateAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(deleteAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });
  },
});

export default addressSlice.reducer;
