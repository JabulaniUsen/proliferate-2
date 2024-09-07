import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/globalContext";

const NavItem = ({ to, className, name, Icon, children, noArrow, onClick }) => {
  const navigate = useNavigate();
  const { setOpenNav } = useGlobalContext();

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      if (onClick) {
        onClick();
        return;
      }
    }
  };

  return (
    <div onClick={handleClick} className={`nav-item font-Inter ${className}`}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-[#1F70B2] w-[200px] lg:w-full border border-[#FFFFFF2B] py-[5px] px-[15px] cursor-pointer flex items-center gap-[5px] text-white"
      >
        <Icon />
        <p className="whitespace-nowrap">{name}</p>
        {!noArrow && <IoIosArrowForward className="ml-aut" />}
      </div>
      {children && (
        <div
          onClick={() => setOpenNav(false)}
          className={`${
            isOpen ? "h-fit mb-[10px]" : "h-0"
          } overflow-hidden flex flex-col`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default NavItem;
