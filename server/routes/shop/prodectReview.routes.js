import express from "express";
import {
  addProductReview,
  getProductReviews,
} from "../../controllers/shop/productReview_controller.js";

const reviewRoute = express.Router();

reviewRoute.post("/add", addProductReview);
reviewRoute.get("/get/:productId", getProductReviews);

export default reviewRoute;
