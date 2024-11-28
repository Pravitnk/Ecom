import express from "express";
import {
  capturePayment,
  createOrder,
} from "../../controllers/shop/order-controller.js";

const orderRoute = express.Router();

orderRoute.post("/create", createOrder);
orderRoute.post("/capture", capturePayment);

export default orderRoute;
