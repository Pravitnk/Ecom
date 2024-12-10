import express from "express";
import { searchProducts } from "../../controllers/shop/search_controller.js";

const searchRoute = express.Router();

searchRoute.get("/:keyword", searchProducts);

export default searchRoute;
