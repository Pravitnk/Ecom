import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverURL } from "@/config/config";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addProductReview = createAsyncThunk(
  "review/addProductReview",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${serverURL}/api/shop/review/add`,
        formData
      );

      return response?.data;
    } catch (error) {
      console.error(
        "Error in adding review:",
        error?.response?.data || error.message
      );
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const getProductReviews = createAsyncThunk(
  "/review/getProductReviews",
  async (id) => {
    try {
      const response = await axios.get(
        `${serverURL}/api/shop/review/get/${id}`
      );

      return response.data;
    } catch (error) {
      console.log("Error in fetching reviews", error);
    }
  }
);

const productReviewSlice = createSlice({
  name: "productReview",
  initialState,
  reducers: {
    // resetOrderDetalis: (state) => {
    //   state.orderDetails = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getProductReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

// export const { resetOrderDetalis } = productReviewSlice.actions;

export default productReviewSlice.reducer;
