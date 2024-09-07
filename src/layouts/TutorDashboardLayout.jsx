import React from "react";
import { Outlet } from "react-router-dom";
import TutorSideNavbar from "../components/TutorSideNavbar";
import TutorHeader from "../components/TutorHeader";

const TutorDashboardLayout = () => {
  return (
    <div>
      <TutorHeader />
      <div className="flex">
        <TutorSideNavbar />
        <div className="relative lg:pl-[5px] w-full lg:flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TutorDashboardLayout;
