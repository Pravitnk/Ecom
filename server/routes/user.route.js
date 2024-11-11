import express from "express";
import { clerkWebhooks, userRole } from "../controllers/user.controller.js";
import authUser from "../middleware/auth.js";

const router = express.Router();

router.post("/login", clerkWebhooks);
router.get("/role", authUser, userRole);

export default router;
