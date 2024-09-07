import React from "react";
import { Outlet } from "react-router-dom";

const StudentAuthLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default StudentAuthLayout;
