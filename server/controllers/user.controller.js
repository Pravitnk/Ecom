import { Webhook } from "svix";
import userModel from "../models/user.model.js";

const clerkWebhooks = async (req, res) => {
  console.log("11");

  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
    const { data, type } = req.body;
    console.log("Webhook Body:", data);
    console.log("Webhook type:", type);

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          phone: data.phone_numbers[0].phone_number,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
          role: "user", // Default role or other logic
        };

        await userModel.create(userData);
        res.json({});
        console.log("1");

        break;
      }

      case "user.updated": {
        const userData = {
          phone: data.phone_numbers[0].phone_number,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
          role: "user", // Default role or other logic
        };

        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        res.json({});
        console.log("2");

        break;
      }

      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        res.json({});
        console.log("3");

        break;
      }

      default:
        console.log("4");

        break;
    }
    console.log("21");
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { clerkWebhooks };
