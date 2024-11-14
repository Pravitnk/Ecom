import express from "express";
import {
  getAllFilterdProducts,
  getProductDetails,
} from "../../controllers/shop/products_controller.js";

const shopRoute = express.Router();

shopRoute.get("/get", getAllFilterdProducts);
shopRoute.get("/get/:id", getProductDetails);

export default shopRoute;
