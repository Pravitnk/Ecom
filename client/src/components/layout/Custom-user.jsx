import { UserButton } from "@clerk/clerk-react";
import { Accessibility } from "lucide-react";
import React from "react";

const CustomUser = () => {
  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: "w-10 h-10",
        },
      }}
    >
      <UserButton.MenuItems>
        <UserButton.Link
          label="Account"
          labelIcon={<Accessibility size={30} />}
          href="/shop/account"
        />
        <UserButton.Action label="manageAccount" />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default CustomUser;
