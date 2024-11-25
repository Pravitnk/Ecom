import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice/auth";
import adminProductSlice from "./admin/product";
import shopProductSlice from "./shop-slice/products";
import shopCartSlice from "./shop-slice/cartSlice";
import addressSlice from "./shop-slice/addressSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    admin: adminProductSlice,
    shop: shopProductSlice,
    shopCart: shopCartSlice,
    address: addressSlice,
  },
});

export default store;
