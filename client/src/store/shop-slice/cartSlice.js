import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  cartItems: [],
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ clerkId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/shop/cart/add`,
        { clerkId, productId, quantity }
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

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (clerkId) => {
    const result = await axios.get(
      `http://localhost:4000/api/shop/cart/get/${clerkId}`
    );
    return result?.data;
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ clerkId, productId, quantity }) => {
    const result = await axios.put(
      `http://localhost:4000/api/shop/cart/update-cart`,
      { clerkId, productId, quantity }
    );

    return result?.data;
  }
);

export const deleteToCart = createAsyncThunk(
  "cart/deleteToCart",
  async ({ clerkId, productId }) => {
    const result = await axios.delete(
      `http://localhost:4000/api/shop/cart/${clerkId}/${productId}`
    );
    return result?.data;
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
        // state.cartItems = action.payload.data || [];
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartItemQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppingCartSlice.reducer;
