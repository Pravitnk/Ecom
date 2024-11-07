import React, { useEffect } from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if the user is already signed in
    if (isSignedIn) {
      navigate("/shop/home"); // Redirect to home page
    }
  }, [isSignedIn, navigate]);

  const handleSignInClick = () => {
    openSignIn({
      afterSignInUrl: "/shop/home", // Redirect to home after sign-in
      afterSignUpUrl: "/shop/home", // Redirect to home after sign-up
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleSignInClick}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all duration-300"
      >
        Sign In
      </button>
    </div>
  );
};

export default Login;
