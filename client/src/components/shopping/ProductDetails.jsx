import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { setProductDetails } from "@/store/shop-slice/products";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "../ui/label";
import StarRating from "../common/Star_rating";
import {
  addProductReview,
  getProductReviews,
} from "@/store/shop-slice/productReviewSlice";
import { useClerk } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const ProductDetails = ({ open, setOpen, productDetails, handleAddToCart }) => {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.productReview);
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useClerk();

  const handleRatingChange = (getRating) => {
    setRating(getRating);
  };

  const handleAddReview = () => {
    dispatch(
      addProductReview({
        productId: productDetails?._id,
        userId: user.id,
        userName: user?.username,
        reviewMessage: reviewMsg,
        rating: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getProductReviews(productDetails?._id));
        toast.success("Review has been added successfully");
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  };

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getProductReviews(productDetails._id));
    }
  }, [productDetails]);

  const reviewAverage =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewtem) => sum + reviewtem.rating, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[85vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
          <div className="mt-5 flex items-end justify-end">
            <Button>View Photos</Button>
          </div>
        </div>
        <div className="gap-6">
          <div>
            <h1 className="text-3xl font-bold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-xl mt-4 mb-5">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-2xl font-semibold ${
                productDetails?.salePrice > 0
                  ? "text-muted-foreground line-through"
                  : "text-primary"
              }`}
            >
              Rs.{productDetails?.price.toFixed(2)}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-semibold text-primary">
                Rs.{productDetails?.salePrice.toFixed(2)}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRating rating={reviewAverage} />
            </div>
            <span className="text-muted-foreground">
              ({reviewAverage.toFixed(1)})
            </span>
          </div>
          {/* <div className="mt-5 mb-5 flex justify-between gap-4 "> */}
          {productDetails?.totalStock === 0 ? (
            <div className="mt-5 mb-5 flex justify-center">
              <Button
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
                className="w-full hover opacity-60 cursor-not-allowed"
              >
                Out of Stock
              </Button>
            </div>
          ) : (
            <div className="mt-5 mb-5 flex justify-between gap-4 ">
              <Button
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
                className="w-1/2 hover:scale-105 transition-all duration-500"
              >
                Add to Cart
              </Button>
              <Button className="w-1/2 hover:scale-105 transition-all duration-500">
                Buy Now
              </Button>
            </div>
          )}

          {/* </div> */}
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews?.map((review) => (
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback className="font-extrabold bg-gray-300">
                        {review?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{review?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRating rating={review?.rating} />
                      </div>
                      <p className="text-muted-foreground">
                        {review?.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews Yet</h1>
              )}
            </div>
            <div className="mt-10 flex flex-col gap-2">
              <Label className="text-lg font-bold">Write a review</Label>
              <div className="flex">
                <StarRating
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(e) => setReviewMsg(e.target.value)}
                placeholder="Write a review"
              />
              <Button
                className="mt-2"
                disabled={reviewMsg.trim() === ""}
                onClick={handleAddReview}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
