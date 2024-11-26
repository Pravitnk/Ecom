import React, { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/Form";

const initialFormData = {
  status: "",
};

const AdminOrderDetailsView = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleOrderUpdateStatus = (e) => {
    e.preventDefault();
  };

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Order ID</p>
            <Label>1234</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Date</p>
            <Label>28-11-2024</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Status</p>
            <Label>Pending</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Price</p>
            <Label>Rs.100.00</Label>
          </div>
        </div>
        <Separator className="h-[1px] bg-slate-500" />
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="font-semibold text-xl">Order Details</div>
            <ui className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>Product 1</span>
                <span>Rs.100.00</span>
              </li>
            </ui>
          </div>
        </div>

        {/* shipping info */}
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="font-semibold text-xl">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>Pravit</span>
              <span>Address</span>
              <span>State</span>
              <span>City</span>
              <span>Pincode</span>
              <span>Phone</span>
              <span>Notes</span>
            </div>
          </div>
        </div>

        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                type: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "underProcess", label: "Under Process" },
                  { id: "underShipping", label: "Under Shipping" },
                  { id: "failed", label: "Failed" },
                  { id: "outForDelivery", label: "Out for Delivery" },
                  { id: "delivered", label: "Delivered" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleOrderUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetailsView;
