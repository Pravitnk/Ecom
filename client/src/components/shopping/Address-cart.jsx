import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

const AddressCard = ({
  addressInfo,
  handleUpdateAddress,
  handleDeleteAddress,
  setCurrentSelectedAddress,
  selectedId,
}) => {
  const labelAndValue = [
    { label: "Landmark", value: addressInfo?.address },
    { label: "State", value: addressInfo?.state },
    { label: "City", value: addressInfo?.city },
    { label: "Pincode", value: addressInfo?.pincode },
    { label: "Phone", value: addressInfo?.phone },
    { label: "Note", value: addressInfo?.notes },
  ];
  return (
    <Card
      // onClick={
      //   setCurrentSelectedAddress
      //     ? () => setCurrentSelectedAddress(addressInfo)
      //     : null
      // }
      className={`cursor-pointer border-blue-500 ${
        selectedId?._id === addressInfo?._id
          ? "border-blue-700 border-[4px]"
          : "border-black"
      }`}
    >
      <div className="relative left-2 top-2">
        <Checkbox
          checked={selectedId?._id === addressInfo?._id}
          onClick={
            setCurrentSelectedAddress
              ? () => setCurrentSelectedAddress(addressInfo)
              : null
          }
        />
      </div>
      <CardContent className="grid gap-4 p-4">
        {labelAndValue &&
          labelAndValue.map((item, index) => (
            <Label key={index}>
              <span className="font-semibold">{item.label} : </span>
              {item.value}
            </Label>
          ))}

        <CardFooter className="flex justify-between mt-2">
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
