import { Webhook } from "svix";
import userModel from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

//api controller to manage clerk user
const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          phone: data.phone_numbers[0].phone_number,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
          // role: "user", // Default role or other logic
        };

        await userModel.create(userData);
        res.json({});

        break;
      }

      case "user.updated": {
        const userData = {
          phone: data.phone_numbers[0].phone_number,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
          // role: "user", // Default role or other logic
        };

        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        res.json({});

        break;
      }

      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        res.json({});

        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const userRole = async (req, res) => {
  try {
    const { clerkId } = req.body;

    // Find the user by clerkId and select only the "role" field
    const userData = await userModel.findOne({ clerkId }).select("role");

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, role: userData.role });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { clerkWebhooks, userRole };
