import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

export const getAllFilteredProduct = createAsyncThunk(
  "/products/getAllFilteredProduct",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const result = await axios.get(
      `http://localhost:4000/api/shop/products/get?${query}`
    );

    return result?.data;
  }
);

export const getProductDetails = createAsyncThunk(
  "/products/getProductDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:4000/api/shop/products/get/${id}`
    );

    return result?.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFilteredProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFilteredProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(getAllFilteredProduct.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(getProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(getProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productList = null;
      });
  },
});

// export const { setAdminSlice } = adminProductSlice.actions;
export default shoppingProductSlice.reducer;
