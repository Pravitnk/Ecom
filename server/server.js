import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import databaseConnection from "./config/db.js";
import router from "./routes/user.route.js";
import adminRoute from "./routes/admin/product_route.js";
import shopRoute from "./routes/shop/product_route.js";
import cartRout from "./routes/shop/cart.route.js";
import addressRoute from "./routes/shop/address.routes.js";
import orderRoute from "./routes/shop/order.routes.js";
import adminOrder from "./routes/admin/order.routes.js";
import searchRoute from "./routes/shop/search.routes.js";
import reviewRoute from "./routes/shop/prodectReview.routes.js";
import featureRoute from "./routes/common/feature.routes.js";

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
app.use("/api/admin/orders", adminOrder);
app.use("/api/shop/products", shopRoute);
app.use("/api/shop/cart", cartRout);
app.use("/api/shop/address", addressRoute);
app.use("/api/shop/order", orderRoute);
app.use("/api/shop/search", searchRoute);
app.use("/api/shop/review", reviewRoute);

app.use("/api/common/feature", featureRoute);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
