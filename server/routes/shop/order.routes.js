import express from "express";
import {
  capturePayment,
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
} from "../../controllers/shop/order-controller.js";

const orderRoute = express.Router();

orderRoute.post("/create", createOrder);
orderRoute.post("/capture", capturePayment);
orderRoute.get("/list/:userId", getAllOrdersByUser);
orderRoute.get("/details/:id", getOrderDetails);

export default orderRoute;
