import { useAuth } from "@clerk/clerk-react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial State
const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

// Async thunk to fetch user role
export const fetchUserRole = createAsyncThunk(
  "auth/fetchUserRole",
  async () => {
    try {
      const { getToken } = useAuth();

      const token = getToken();
      const response = await axios.get(`http://localhost:4000/api/auth/role`, {
        headers: { token },
      });
      console.log("res", response);

      return response.data;
    } catch (error) {
      throw error; // Handle errors as appropriate
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserRole: (state, action) => {
      state.user = { ...state.user, role: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload; // Ensure payload includes the role and other user details
      })
      .addCase(fetchUserRole.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

// Export actions and reducer
export const { setUserRole } = authSlice.actions;
export default authSlice.reducer;
