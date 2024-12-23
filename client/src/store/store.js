import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice/auth";
import adminProductSlice from "./admin/product";
import adminOrderSlice from "./admin/orderSlice";
import shopProductSlice from "./shop-slice/products";
import shopCartSlice from "./shop-slice/cartSlice";
import addressSlice from "./shop-slice/addressSlice";
import orderSlice from "./shop-slice/orderSlice";
import searchSlice from "./shop-slice/searchSlice";
import productReviewSlice from "./shop-slice/productReviewSlice";
import commonSlice from "./common/commonSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    admin: adminProductSlice,
    adminOrders: adminOrderSlice,
    shop: shopProductSlice,
    shopCart: shopCartSlice,
    address: addressSlice,
    order: orderSlice,
    search: searchSlice,
    productReview: productReviewSlice,
    features: commonSlice,
  },
});

export default store;
