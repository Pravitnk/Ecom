import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Siderbar from "./Siderbar";
import Header from "./Header";

const AdminLayout = () => {
  const [opneSideBar, setOpenSideBar] = useState(false);
  return (
    <div className="flex min-h-screen w-full">
      {/* admin sidebar */}
      <Siderbar open={opneSideBar} setOpen={setOpenSideBar} />
      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <Header setOpen={setOpenSideBar} />
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
