import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const Checkauth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  const path = location.pathname;

  if (location.pathname === "/") {
    return <Navigate to="/auth/login" />; // Redirect to login page if on home page
  } else {
    if (user?.role === "admin") {
      <Navigate to="/admin/dashboard" />;
    } else {
      <Navigate to="/shop/home" />;
    }
  }
  // 1. Redirect to login if not authenticated and not already on login page
  if (!isAuthenticated && !path.includes("/login")) {
    return <Navigate to="/auth/login" />;
  }

  // 2. Redirect authenticated users away from login page to their respective dashboards
  if (isAuthenticated && path.includes("/login")) {
    return user?.role === "admin" ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <Navigate to="/shop/home" />
    );
  }

  // 3. Restrict access to admin routes if user role is not admin
  if (isAuthenticated && user?.role !== "admin" && path.includes("/admin")) {
    return <Navigate to="/unauth-page" />;
  }

  // 4. Restrict access to shop routes if user role is admin
  if (isAuthenticated && user?.role === "admin" && path.includes("/shop")) {
    return <Navigate to="/admin/dashboard" />;
  }

  // Allow access to the intended route if all checks pass
  return <>{children}</>;
};

export default Checkauth;
