import React from "react";
import { Outlet } from "react-router-dom";
import ShopHeader from "./ShopHeader";

const ShoppingLayout = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* header */}
      <ShopHeader />

      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default ShoppingLayout;
