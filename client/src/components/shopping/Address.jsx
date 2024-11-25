import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/Form";
import { addressFormControls } from "@/config";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, getAllAddress } from "@/store/shop-slice/addressSlice";
import { useClerk } from "@clerk/clerk-react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddressCard from "./Address-cart";

const initialAddressFormData = {
  address: "",
  state: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};

const Address = () => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const { addressList } = useSelector((state) => state.address);
  const dispatch = useDispatch();
  const { user } = useClerk();
  console.log(addressList);

  // Validate if all mandatory fields are filled
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleManageAddress = (e) => {
    e.preventDefault();
    dispatch(addAddress({ ...formData, clerkId: user.id })).then((data) => {
      console.log("data", data);
      if (data?.payload?.success) {
        dispatch(getAllAddress(user?.id));
        toast.success("Address added successfully");
      } else {
        toast.error("Failed to add address");
      }
    });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .filter((key) => key !== "notes") // Exclude the 'notes' field from validation
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  };

  const handleUpdateAddress = () => {};

  const handleDeleteAddress = () => {};

  useEffect(() => {
    dispatch(getAllAddress(user?.id));
  }, [dispatch]);

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {addressList && addressList.length > 0
          ? addressList.map((item) => (
              <AddressCard
                key={item._id}
                addressInfo={item}
                handleUpdateAddress={handleUpdateAddress}
                handleDeleteAddress={handleDeleteAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>Add New Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={"Add"}
          onSubmit={handleManageAddress}
        /> */}
        <form onSubmit={handleManageAddress} className="space-y-4">
          {/* Address */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label className="font-medium">Address</label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full"
                placeholder="Enter address"
              />
            </div>
          </div>

          {/* State and City */}
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <label className="font-medium">State</label>
              <Input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full"
                placeholder="Enter state"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="font-medium">City</label>
              <Input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full"
                placeholder="Enter city"
              />
            </div>
          </div>

          {/* Pincode and Phone */}
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-2">
              <label className="font-medium">Pincode</label>
              <Input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full"
                placeholder="Enter pincode"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="font-medium">Phone</label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label className="font-medium">Notes</label>
              <Input
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="border rounded-md p-2 w-full"
                placeholder="Enter Note"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={!isFormValid()}
            className={`px-4 py-2 rounded-md font-semibold w-full`}
          >
            Add
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Address;
