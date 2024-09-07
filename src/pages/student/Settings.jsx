import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Settings = () => {
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
            to="/settings/account"
          >
            Account setting
          </Link>
          <Link
            className={`${
              path.includes("login") || path.includes("two-factor-auth")
                ? "text-blue border-blue"
                : "text-[#717B8C] border-[#717B8C]"
            }`}
            to="/settings/login"
          >
            Login & Security
          </Link>
          <Link
            className={`${
              path.includes("/settings/profile")
                ? "text-blue border-blue"
                : "text-[#717B8C] border-[#717B8C]"
            }`}
            to="/settings/profile"
          >
            Profile Summary
          </Link>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
