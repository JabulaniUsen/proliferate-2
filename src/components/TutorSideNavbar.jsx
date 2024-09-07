import React from "react";
import NavItem from "./NavItem";
import { GoHome } from "react-icons/go";
import { ClassIcon, TutorIcon, AssignmentIcon } from "../assets/Icons.jsx";
import { TbMessage } from "react-icons/tb";
import { VscCreditCard } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import refer from "../assets/referImg.png";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../context/globalContext";
import { useAuthContext } from "../context/authContext";
import { useUser } from "../context/userContext.jsx";

const TutorSideNavbar = () => {
  const navigate = useNavigate();
  const { openNav, setOpenNav } = useGlobalContext();
  const { logout } = useAuthContext();
  const { setProfile } = useUser();

  return (
    <div
      className={`bg-gradient-to-b from-[#1B87E1] via-blue-500 to-[#0C2E4A]
      ${
        openNav ? "left-0" : "left-[-100%]"
      }  z-[20] fixed lg:sticky top-0 w-[80%] lg:w-[244px] h-screen lg:h-fit pt-[20px] sm:pt-[62px] pb-[20px] px-[15px] sm:px-[39px]`}
    >
      <div className="mb-[40px] flex lg:hidden items-center justify-between">
        <Link to="/">
          <img className="h-[58.77px]" src={logo} alt="logo" />
        </Link>

        <button onClick={() => setOpenNav(false)}>
          <FaTimes className="text-[red] text-[30px]" />
        </button>
      </div>

      <NavItem name="Dashboard" to="/tutor" Icon={GoHome}></NavItem>
      <NavItem name="My Schedule" to="/tutor/schedule" Icon={ClassIcon} />
      <NavItem name="My Students" Icon={AssignmentIcon}>
        <Link to="/tutor/manage-students">Manage Students</Link>
      </NavItem>
      <NavItem name="Assignments" Icon={TutorIcon}>
        <Link to="/tutor/add-assignment">Add New</Link>
        <Link to="/tutor/manage-assignments">Manage</Link>
      </NavItem>
      <NavItem name="Report" Icon={TbMessage}>
        <Link to="/tutor/report/add">Add Report</Link>
        <Link to="/tutor/report/history">History</Link>
      </NavItem>
      <NavItem
        to="/tutor/notifications"
        name="Notifications"
        Icon={VscCreditCard}
      />
      <NavItem to="/tutor/messages" name="Messaging" Icon={VscCreditCard} />
      <NavItem to="/tutor/earnings" name="Earnings" Icon={VscCreditCard} />

      {/* <NavItem
        to="/feedback"
        className="lg:mt-[40px]"
        name="Feedback"
        Icon={VscCreditCard}
        noArrow={true}
      /> */}

      <div className="lg:mt-[80px]">
        <NavItem
          to="/tutor/settings/account"
          name="Settings"
          Icon={IoSettingsOutline}
          noArrow={true}
        />
        <NavItem
          onClick={() => {
            logout();
            setProfile({});
          }}
          noArrow={true}
          name="Logout"
          Icon={FiLogOut}
        ></NavItem>
      </div>

      <div>
        <div className="hidden lg:block">
          <img src={refer} alt="Refer and earn" />
        </div>
        <button
          onClick={() => navigate("/tutor/refer")}
          className="mt-[20px] lg:mt-[-50px] w-full bg-[#186BAD] rounded-[8px] p-[16px] text-white"
        >
          Refer & Earn
        </button>
      </div>
    </div>
  );
};

export default TutorSideNavbar;
