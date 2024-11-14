import { SignOutButton, useClerk, UserButton } from "@clerk/clerk-react";
import { UserCog } from "lucide-react";
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
          labelIcon={<UserCog className="mr-2 h-4 w-4" size={30} />}
          href="/shop/account"
        />
        <UserButton.Action label="manageAccount" />
        <UserButton.Action label="signOut" />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default CustomUser;
