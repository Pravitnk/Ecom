import Review from "../../models/review.js";
import Order from "../../models/order.js";
import ProductModel from "../../models/products.model.js";

const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, rating } = req.body;
    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "Confirmed",
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "No order found for the given product and user",
      });
    }
    const checkExistingReview = await Review.findOne({ productId, userId });

    if (checkExistingReview) {
      return res.status(400).json({
        success: false,
        message: "User has already reviewed this product",
      });
    }
    const newReview = new Review({
      productId,
      userId,
      userName,
      reviewMessage,
      rating,
    });

    await newReview.save();
    const reviews = await Review.find({ productId });
    const totalReviewsLength = reviews.length;
    const averageRating =
      reviews.reduce((sum, reviewItem) => sum + reviewItem.rating, 0) /
      totalReviewsLength;

    await ProductModel.findByIdAndUpdate(productId, { averageRating });
    res
      .status(200)
      .json({ success: true, message: "Review added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error Occured" });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId });
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error Occured" });
  }
};

export { addProductReview, getProductReviews };
