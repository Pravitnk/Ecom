import { Minus, Plus, Trash } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteToCart,
  updateCartItemQuantity,
} from "@/store/shop-slice/cartSlice";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const UserCartContent = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector((state) => state.shop);
  const { cartItems } = useSelector((state) => state.shopCart);

  const { user } = useUser();

  const handleUpdateQuantity = (getCartItems, typeOfAction) => {
    if (typeOfAction === "plus") {
      let getAllCartItems = cartItems.items || [];
      if (getAllCartItems.length) {
        const indexOfCurrentCartItem = getAllCartItems.findIndex(
          (item) => item.productId === getCartItems?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItems?.productId
        );

        const getTotalStock = productList[getCurrentProductIndex].totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getAllCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast.error(`Cannot add more than available stock`);
            return;
          }
        }
      }
    }

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
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-bold">{cartItem?.title}</h3>
        <div className="flex items-center mt-1 gap-3">
          <Button
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
            size="sm"
            className="h-7 w-7 rounded-full"
            disabled={cartItem?.quantity === 1}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
            size="sm"
            className="h-7 w-7 rounded-full"
            // disabled={
            //   cartItems?.items === 0 ||
            //   productList?.find(
            //     (product) => product._id === cartItem?.productId
            //   )?.totalStock <= cartItem?.quantity
            // }
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
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
};

export default UserCartContent;
