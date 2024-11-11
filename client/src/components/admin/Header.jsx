import React from "react";
import { Button } from "../ui/button";
import { AlignJustify } from "lucide-react";
import { UserButton, useUser } from "@clerk/clerk-react";

const Header = ({ setOpen }) => {
  const { isSignedIn } = useUser();

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b pr-8">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        {isSignedIn ? (
          <UserButton className="text-white bg-blue-700 text-center font-semibold px-4 py-2 rounded-md transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg" />
        ) : (
          <Button
            onClick={() => navigate("/auth/login")}
            className="text-white bg-blue-700 font-semibold px-4 py-2 rounded-md transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg"
          >
            SingIn
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
