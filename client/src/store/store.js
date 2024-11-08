import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice/auth";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
