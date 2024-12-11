import express from "express";
import {
  addFeatureImage,
  getFeatureImages,
} from "../../controllers/common/feature_controller.js";

const featureRoute = express.Router();

featureRoute.post("/add", addFeatureImage);
featureRoute.get("/get", getFeatureImages);

export default featureRoute;
