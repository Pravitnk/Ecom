import { Minus, Plus, Trash } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import {
  deleteToCart,
  updateCartItemQuantity,
} from "@/store/shop-slice/cartSlice";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const UserCartContent = ({ cartItems }) => {
  const dispatch = useDispatch();
  const { user } = useUser();

  const handleUpdateQuantity = (getCartItems, typeOfAction) => {
    // Calculate the new quantity
    const newQuantity =
      typeOfAction === "plus"
        ? getCartItems?.quantity + 1
        : getCartItems?.quantity - 1;

    // Prevent sending invalid quantities
    if (newQuantity < 1) {
      toast.error("Quantity cannot be less than 1.");
      return;
    }
    dispatch(
      updateCartItemQuantity({
        clerkId: user?.id,
        productId: getCartItems?.productId,
        quantity: newQuantity,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Cart item is updated successfully");
      } else {
        toast.error("Failed to update cart item.");
      }
    });
  };

  const handleCartItemDelete = (getCartItems) => {
    dispatch(
      deleteToCart({
        clerkId: user?.id,
        productId: getCartItems?.productId,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast.success("Cart item is deleted successfully");
      } else {
        toast.error("Failed to delete cart item.");
      }
    });
  };

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItems?.image}
        alt={cartItems?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-bold">{cartItems?.title}</h3>
        <div className="flex items-center mt-1 gap-3">
          <Button
            onClick={() => handleUpdateQuantity(cartItems, "minus")}
            size="sm"
            className="h-7 w-7 rounded-full"
            disabled={cartItems?.quantity === 1}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">decrease</span>
          </Button>
          <span className="font-semibold">{cartItems?.quantity}</span>
          <Button
            onClick={() => handleUpdateQuantity(cartItems, "plus")}
            size="sm"
            className="h-7 w-7 rounded-full"
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          Rs.
          {(
            (cartItems?.salePrice > 0
              ? cartItems?.salePrice
              : cartItems?.price) * cartItems?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItems)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
};

export default UserCartContent;
