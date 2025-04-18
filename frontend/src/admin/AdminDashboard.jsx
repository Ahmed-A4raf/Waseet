import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "./common/SidebarAdmin";

const AdminDashboard = () => {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Baground */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-light/95 via-primary-light to-primary-light/95 opacity-80" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>

        <SidebarAdmin />
        <Outlet />
      </div>
    </>
  );
};

export default AdminDashboard;
