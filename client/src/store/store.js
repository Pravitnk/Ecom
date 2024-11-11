import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice/auth";
import adminProductSlice from "./admin/product";

const store = configureStore({
  reducer: {
    auth: authSlice,
    admin: adminProductSlice,
  },
});

export default store;
