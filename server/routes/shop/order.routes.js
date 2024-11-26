import express from "express";
import { createOrder } from "../../controllers/shop/order-controller.js";

const orderRoute = express.Router();

orderRoute.post("/create", createOrder);

export default orderRoute;
