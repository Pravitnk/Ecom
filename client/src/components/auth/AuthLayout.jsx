import React from "react";
import { Outlet } from "react-router-dom";

// Helper function to split text into animated letters
const AnimatedText = ({ text }) => {
  return (
    <h1 className="text-4xl font-extrabold tracking-tighter text-white flex space-x-2">
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="animated-letter"
          style={{ animationDelay: `${index * 0.3}s` }} // Delay each letter animation
        >
          {char}
        </span>
      ))}
    </h1>
  );
};

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      {/* Common part (Welcome section) */}
      <div className="hidden lg:flex items-center justify-center bg-black w-full lg:w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <AnimatedText text="Welcome to our Store" />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
