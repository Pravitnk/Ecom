import React, { useEffect, useState } from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

const Login = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect to home if the user is already signed in
    if (isLoaded) {
      setLoading(false);
      if (isSignedIn) {
        navigate("/shop/home");
        toast.success("Successfully Logged in");
      }
    }
  }, [isSignedIn, isLoaded, navigate]);

  const handleSignInClick = (e) => {
    e.preventDefault();
    openSignIn({
      afterSignInUrl: "/shop/home", // Redirect to home after sign-in
      afterSignUpUrl: "/shop/home", // Redirect to home after sign-up
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-pink-500 text-white">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-gray-200">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome!</h1>
        <p className="text-lg text-gray-600 mt-2">Please Log in to continue</p>
      </div>
      <Button
        onClick={handleSignInClick}
        className="px-8 py-4 w-[40vw] tracking-widest font-bold text-lg rounded-md shadow-md hover:transition-all duration-300 scale-105"
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
