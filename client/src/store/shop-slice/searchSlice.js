import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serverURL } from "@/config/config";

const initialState = {
  isLoading: false,
  keyword: "",
  searchResults: [],
};

export const searchProducts = createAsyncThunk(
  "/products/searchProducts",
  async (keyword) => {
    const result = await axios.get(`${serverURL}/api/shop/search/${keyword}`);

    return result?.data;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    resetSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(searchProducts.rejected, (state) => {
        state.isLoading = false;
        state.searchResults = [];
      });
  },
});

export const { resetSearchResults, setSearchKeyword } = searchSlice.actions;

export default searchSlice.reducer;
