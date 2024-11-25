import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const AddressCard = ({
  addressInfo,
  handleUpdateAddress,
  handleDeleteAddress,
}) => {
  return (
    <Card className="bg-slate-200">
      <CardContent className="grid gap-4 p-4">
        <Label>Landmark: {addressInfo?.address}</Label>
        <Label>State: {addressInfo?.state}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>Pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Note: {addressInfo?.notes}</Label>
        <CardFooter className="flex justify-between">
          <Button onClick={() => handleUpdateAddress(addressInfo)}>Edit</Button>
          <Button onClick={() => handleDeleteAddress(addressInfo)}>
            Delete
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
