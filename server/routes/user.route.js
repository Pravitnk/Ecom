import express from "express";
import { clerkWebhooks } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/login", clerkWebhooks);

export default router;
