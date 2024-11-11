import React, { useEffect, useState } from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
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
