import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";

const TutorRegister = () => {
  const { pathname } = useLocation();

  const [currentRoute, setCurrentRoute] = useState(0);
  const routes = [
    "Personal Information",
    "Education & Experience",
    "Teaching Style & Approach",
    "Availability & Preference",
    "Upload Document",
    "Terms & Conditions",
  ];

  const baseRoute = "/auth/tutor/register/";
  useEffect(() => {
    switch (pathname) {
      case baseRoute + "education-and-experience":
        setCurrentRoute(1);
        break;
      case baseRoute + "teaching-style-and-approach":
        setCurrentRoute(2);
        break;
      case baseRoute + "availability-and-preference":
        setCurrentRoute(3);
        break;
      case baseRoute + "upload-document":
        setCurrentRoute(4);
        break;
      case baseRoute + "terms-and-conditions":
        setCurrentRoute(5);
        break;
      default:
        setCurrentRoute(0);
    }
  }, [pathname]);

  return (
    <div className="py-[10px] px-[20px] sm:px-[60px] lg:px-[80px]">
      <Link to="/">
        <img className="w-[150px] sm:w-fit" src={logo} alt="logo" />
      </Link>
      <h1 className="mt-[30px] md:mt-0 mb-[20px] text-[25px] md:text-[32px] font-bold font-Montserrat text-center">
        Tutor Registration
      </h1>

      <div className="hidden w-fit mx-auto sm:flex justify-center border border-[#C9C9C9]">
        {routes.map((route, i) => (
          <div
            key={i}
            className={`${i == routes.length - 1 && "border-none"} ${
              currentRoute == i && "bg-blue text-white"
            } px-[16px] py-[8px] border-r border-[#C9C9C9] text-[12px] font-Poppins font-medium`}
          >
            {route}
          </div>
        ))}
      </div>

      {/* Mobile version */}
      <div className="sm:hidden w-fit mx-auto flex justify-center border border-[#C9C9C9]">
        {routes.map((route, i) => (
          <div
            key={i}
            className={`${i == routes.length - 1 && "border-none"} ${
              currentRoute == i && "bg-blue text-white"
            } px-[16px] py-[8px] border-r border-[#C9C9C9] text-[12px] font-Poppins font-medium`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <div className="mt-[40px]">
        <Outlet />
      </div>
    </div>
  );
};

export default TutorRegister;
