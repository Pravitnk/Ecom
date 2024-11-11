import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    createdAt: { type: Date, default: Date.now },
  },
  { timeStamps: true }
);

const ProductModel =
  mongoose.models.products || mongoose.model("products", productSchema);
export default ProductModel;
