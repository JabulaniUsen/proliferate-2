import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { CiSearch } from "react-icons/ci";
import {
  IoNotificationsOutline as NotiIcon,
  IoSettingsOutline,
  IoMailOutline,
} from "react-icons/io5";
import avatar from "../assets/userAvatar.png";
import { IoIosArrowDown as Arrow } from "react-icons/io";
import { VscMenu } from "react-icons/vsc";
import { useGlobalContext } from "../context/globalContext";
import { useUser } from "../context/userContext";
import { useAuthContext } from "../context/authContext";

const Header = () => {
  const { setOpenNav } = useGlobalContext();
  const { profile } = useUser();
  const { logout, user } = useAuthContext();
  const navigate = useNavigate();

  const [currMenu, setCurrentMenu] = useState("");

  return (
    <div className="w-full bg-white relative z-[10] h-[91px] px-10 flex justify-between items-center shadow-xl">
      <Link to="/" className="hidden lg:block">
        <img className="h-[58.77px]" src={logo} alt="logo" />
      </Link>

      <button
        onClick={() => setOpenNav((prev) => !prev)}
        className="block lg:hidden "
      >
        <VscMenu className="text-[30px] cursor-pointer" />
      </button>

      <div className="w-[451px] p-[8px] border border-[#D0D5DD] rounded-[50px] hidden lg:flex gap-[10px] items-center pl-[20px] 2xl:pl-[20.6px]">
        <CiSearch />
        <input
          className="flex-1 outline-none bg-[transaprent]"
          placeholder="Search"
          type="text"
        />
      </div>

      <div className="flex items-center gap-[20px]">
        <button className="relative">
          <div
            onClick={() => setCurrentMenu(currMenu == 1 ? "" : "1")}
            className="relative"
          >
            <IoMailOutline className="text-[23px]" />

            <div className="absolute right-[0px] top-[0px] size-[5px] bg-[red] rounded-full"></div>
          </div>

          <div
            className={`${
              currMenu != 1 && "hidden"
            } absolute right-0 top-[110%] bg-[white] border border-gray-400 w-[250px] h-[100px] flex flex-col`}
          >
            <div className="px-[5px] py-[10px] flex items-center gap-[5px] border-b border-gray-200">
              <div className="size-[25px] bg-blue rounded-full" />
              <p className="">Hi, I sent you some assignm...</p>
            </div>
            <div className="px-[5px] py-[10px] flex items-center gap-[5px] border-b border-gray-200">
              <div className="size-[25px] bg-blue rounded-full" />
              <p className="">Hi, I sent you some assignm...</p>
            </div>
          </div>
        </button>

        <button className="relative">
          <div
            onClick={() => setCurrentMenu(currMenu == 2 ? "" : "2")}
            className="relative"
          >
            <NotiIcon className="text-[23px]" />

            <div className="absolute right-[3px] top-[0px] size-[5px] bg-[red] rounded-full"></div>
          </div>

          <div
            className={`${
              currMenu != 2 && "hidden"
            } absolute right-0 top-[110%] bg-[white] border border-gray-400 w-[250px] h-[100px] flex flex-col`}
          >
            <div className="px-[3px] py-[10px] border-b border-gray-200">
              <p className="">A new assignment has been po...</p>
            </div>
            <div className="px-[3px] py-[10px] border-b border-gray-200">
              <p className="">A new assignment has been po...</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => navigate("/settings/account")}
          className="hidden lg:block"
        >
          <IoSettingsOutline className="text-[23px]" />
        </button>

        <button className="relative flex items-center gap-[10px] drop-shadow-[100px]">
          <div className="size-[32px] rounded-full overflow-hidden">
            {profile.profileImage ? (
              <img
                className="size-full object-cover rounded-full"
                src={`data:image/jpeg;base64,${profile?.profileImage}`}
                alt="icon"
              />
            ) : (
              <img
                className="size-full object-cover rounded-full"
                src={avatar}
                alt="icon"
              />
            )}
          </div>
          {currMenu != 3 ? (
            <Arrow onClick={() => setCurrentMenu(3)} />
          ) : (
            <Arrow
              className="rotate-[180deg]"
              onClick={() => setCurrentMenu("")}
            />
          )}

          <div
            className={`${
              currMenu != 3 && "hidden"
            } absolute right-0 top-[110%] bg-[white] border border-gray-400 w-[250px] h-[100px] flex flex-col items-end justify-end`}
          >
            <p className="text-end px-[2px] py-[10px]">{user.email}</p>
            <button
              onClick={() => logout()}
              className="w-full py-[10px] text-[red] border-t border-gray-400 font-medium"
            >
              LOGOUT
            </button>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Header;
