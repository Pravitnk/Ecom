import express from "express";
import {
  getAllOrdersOfAllUser,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "../../controllers/admin/orders_controllers.js";

const adminOrder = express.Router();

adminOrder.get("/get", getAllOrdersOfAllUser);
adminOrder.get("/details/:id", getOrderDetailsForAdmin);
adminOrder.put("/update/:id", updateOrderStatus);

export default adminOrder;
