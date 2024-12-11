import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverURL } from "@/config/config";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

export const addFeatureImage = createAsyncThunk(
  "/feature/addFeatureImage",
  async (image, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${serverURL}/api/common/feature/add`, {
        image,
      });
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch orders");
    }
  }
);

export const getFeatureImages = createAsyncThunk(
  "/feature/getFeatureImages",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(`${serverURL}/api/common/feature/get`);
      return result?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch order details"
      );
    }
  }
);

const commonSlice = createSlice({
  name: "features",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      });
  },
});

export default commonSlice.reducer;
