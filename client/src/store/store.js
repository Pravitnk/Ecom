import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice/auth";
import adminProductSlice from "./admin/product";
import shopProductSlice from "./shop-slice/products";
import shopCartSlice from "./shop-slice/cartSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    admin: adminProductSlice,
    shop: shopProductSlice,
    shopCart: shopCartSlice,
  },
});

export default store;
