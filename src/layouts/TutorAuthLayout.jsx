import React from "react";
import { Outlet } from "react-router-dom";

const TutorAuthLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default TutorAuthLayout;
