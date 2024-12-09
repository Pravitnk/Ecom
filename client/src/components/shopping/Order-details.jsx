import React, { useState } from "react";
import { DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

const ShoppingOrderDetailsView = ({ orderDetails, user }) => {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-6">
            <DialogTitle className="font-medium">Order ID</DialogTitle>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`p-2 py-1 px-3 ${
                  orderDetails?.orderStatus === "Confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "failed"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Payment Method</p>

            <Label>{orderDetails?.paymentMethod}</Label>
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Payment Status</p>

            <Label>{orderDetails?.paymentStatus}</Label>
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Price</p>

            <Label>Rs.{orderDetails?.totalAmount.toFixed(2)}</Label>
          </div>
        </div>
        <Separator className="h-[1px] bg-slate-500" />
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="font-semibold text-xl">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems?.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span>Title: {item?.title}</span>
                      <span>Quantity: {item?.quantity}</span>
                      <span>Rs.{item?.price}.00</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>

        {/* shipping info */}
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="font-semibold text-xl">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>
                <span className=" text-black">Name: </span>
                {user.fullName}
              </span>
              <span>
                <span className="text-lg text-black">Landmark: </span>
                {orderDetails?.addressInfo?.address}
              </span>
              <span>
                <span className="text-lg text-black">State: </span>
                {orderDetails?.addressInfo?.state}
              </span>
              <span>
                <span className="text-lg text-black">City: </span>
                {orderDetails?.addressInfo?.city}
              </span>
              <span>
                <span className="text-lg text-black">Pincode: </span>
                {orderDetails?.addressInfo?.pincode}
              </span>
              <span>
                <span className="text-lg text-black">Phone: </span>
                {orderDetails?.addressInfo?.phone}
              </span>
              <span>
                <span className="text-lg text-black">Note: </span>
                {orderDetails?.addressInfo?.notes}
              </span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default ShoppingOrderDetailsView;
