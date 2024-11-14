import express from "express";
import {
  addToCart,
  deleteToCart,
  getCartItems,
  updateCartItemQuantity,
} from "../../controllers/shop/cart_controller.js";

const cartRout = express.Router();

cartRout.post("/add", addToCart);
cartRout.get("/get/:userId", getCartItems);
cartRout.put("/update-cart", updateCartItemQuantity);
cartRout.delete("/delete/:userId/:productId", deleteToCart);

export default cartRout;
