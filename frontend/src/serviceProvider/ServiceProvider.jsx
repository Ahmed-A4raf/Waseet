import React from "react";
import { Outlet } from "react-router-dom";
import SidebarSp from "./commenSP/SidebarSp";

const ServiceProvider = () => {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Baground */}
        <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light/80 via-primary-light to-primary-light/80 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

        <SidebarSp />
        <Outlet />
      </div>
    </>
  );
};

export default ServiceProvider;
