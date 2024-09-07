import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const TutorSettings = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="settings">
      <div className="heading">
        <h1>Settings</h1>
      </div>

      <div className="content">
        <div className="links flex gap-[10px] items-center">
          <Link
            className={`${
              path.includes("account")
                ? "text-blue border-blue"
                : "text-[#717B8C] border-[#717B8C]"
            }`}
            to="/tutor/settings/account"
          >
            Account setting
          </Link>
          <Link
            className={`${
              path.includes("login") || path.includes("two-factor-auth")
                ? "text-blue border-blue"
                : "text-[#717B8C] border-[#717B8C]"
            }`}
            to="/tutor/settings/login"
          >
            Login & Security
          </Link>
          <Link
            className={`${
              path.includes("/settings/grade-and-subjects")
                ? "text-blue border-blue"
                : "text-[#717B8C] border-[#717B8C]"
            }`}
            to="/tutor/settings/grade-and-subjects"
          >
            Grade & Subjects
          </Link>
          <Link
            className={`${
              path.includes("/settings/profile")
                ? "text-blue border-blue"
                : "text-[#717B8C] border-[#717B8C]"
            }`}
            to="/tutor/settings/profile"
          >
            Profile Summary
          </Link>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default TutorSettings;
