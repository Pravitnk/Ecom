import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useClerk,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg py-4 px-8 flex items-center justify-between">
      <div className="text-white text-2xl font-semibold cursor-pointer transition-all duration-300 hover:scale-105">
        YourLogo
      </div>

      <nav>
        {isSignedIn ? (
          <UserButton className="text-white bg-blue-700 font-semibold px-4 py-2 rounded-md transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg" />
        ) : (
          <Button
            onClick={() => navigate("/auth/login")}
            className="text-white bg-blue-700 font-semibold px-4 py-2 rounded-md transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg"
          >
            SingIn
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
