import express from "express";
import {
  deleteAddress,
  addAddress,
  getAllAddress,
  updateAddress,
} from "../../controllers/shop/addrees_controller.js";

const addressRoute = express.Router();

addressRoute.post("/add", addAddress);
addressRoute.get("/get/:clerkId", getAllAddress);
addressRoute.put("/update/:clerkId/:addressId", updateAddress);
addressRoute.delete("/delete/:clerkId/:addressId", deleteAddress);

export default addressRoute;
