import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { CiSearch } from "react-icons/ci";
import scanIcon from "../assets/scanIcon.png";
import mailIcon from "../assets/mailIcon.png";
import notiIcon from "../assets/notiIcon.png";
import settingsIcon from "../assets/setIcon.png";
import commIcon from "../assets/commentIcon.png";
import avatar from "../assets/userAvatar.png";
import { IoIosArrowDown as Arrow } from "react-icons/io";
import { VscMenu } from "react-icons/vsc";
import { useGlobalContext } from "../context/globalContext";
import { useUser } from "../context/userContext";

const TutorHeader = () => {
  const { setOpenNav } = useGlobalContext();
  const { profile } = useUser();

  return (
    <div className="w-full bg-white relative z-[10] h-[91px] pl-[42px] pr-[48.51px] flex justify-between items-center shadow-xl">
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

      <div className="flex items-center gap-[30px]">
        {/* <button className="hidden lg:block">
          <img src={scanIcon} alt="icon" />
        </button> */}
        <button className="hidden lg:block">
          <img src={mailIcon} alt="icon" />
        </button>
        <button>
          <img src={notiIcon} alt="icon" />
        </button>
        <button className="hidden lg:block">
          <img src={settingsIcon} alt="icon" />
        </button>
        {/* <button className="hidden lg:block">
          <img src={commIcon} alt="icon" />
        </button> */}

        <button className="flex items-center gap-[10px] drop-shadow-[100px]">
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
          <Arrow />
        </button>
      </div>
    </div>
  );
};

export default TutorHeader;
