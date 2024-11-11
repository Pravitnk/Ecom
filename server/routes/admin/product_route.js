import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  handleImageUpload,
  updateProduct,
} from "../../controllers/admin/product_controller.js";
import { upload } from "../../helper/cloudinary.js";

const adminRoute = express.Router();

adminRoute.post("/upload-image", upload.single("my_file"), handleImageUpload);
adminRoute.post("/add", addProduct);
adminRoute.get("/get", getAllProduct);
adminRoute.put("/edit/:id", updateProduct);
adminRoute.delete("/delete/:id", deleteProduct);

export default adminRoute;
