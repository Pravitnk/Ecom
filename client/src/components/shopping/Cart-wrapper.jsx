import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartContent from "./Cart-content";
import { Button } from "../ui/button";

const UserCartWrapper = ({ cartItems }) => {
  const cartTotal =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            ((currentItem?.salePrice ?? 0) > 0
              ? currentItem?.salePrice
              : currentItem?.price ?? 0) *
              (currentItem?.quantity ?? 1),
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UserCartContent cartItems={item} />)
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">Rs.{cartTotal.toFixed(2)}</span>
        </div>
      </div>
      <Button className="mt-5 w-full">Checkout</Button>
    </SheetContent>
  );
};

export default UserCartWrapper;
