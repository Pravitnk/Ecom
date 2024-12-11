import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: { type: String },
    userId: { type: String },
    userName: { type: String },
    reviewMessage: { type: String },
    rating: { type: Number, min: 1, max: 5 },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);
export default Review;
