import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import databaseConnection from "./config/db.js";
import router from "./routes/user.route.js";
import adminRoute from "./routes/admin/product_route.js";
import shopRoute from "./routes/shop/product_route.js";
import cartRout from "./routes/shop/cart.route.js";

// Load environment variables from.env file
await databaseConnection();
dotenv.config({ path: ".env" });
const port = process.env.PORT || 4000;

const app = express();

app.get("/", (req, res) => {
  res.send("Home page...");
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
      "token",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", router);
app.use("/api/admin/products", adminRoute);
app.use("/api/shop/products", shopRoute);
app.use("/api/shop/cart", cartRout);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
