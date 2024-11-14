import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice/auth";
import adminProductSlice from "./admin/product";
import shopProductSlice from "./shop-slice/products";

const store = configureStore({
  reducer: {
    auth: authSlice,
    admin: adminProductSlice,
    shop: shopProductSlice,
  },
});

export default store;
