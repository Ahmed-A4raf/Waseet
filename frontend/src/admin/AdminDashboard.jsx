import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "./common/SidebarAdmin";

const AdminDashboard = () => {
  return (
    <>
      <SidebarAdmin />
      <Outlet />
    </>
  );
};

export default AdminDashboard;
