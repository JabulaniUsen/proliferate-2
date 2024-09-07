import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideNavbar from "../components/SideNavbar";

const StudentDashboardLayout = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <SideNavbar />
        <div className="relative lg:pl-[5px] w-full lg:flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardLayout;
