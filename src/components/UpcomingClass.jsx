import React from "react";
import { CountDownIcon } from "../assets/Icons";

const UpcomingClass = ({ img, time, date }) => {
  return (
    <div className="pr-[40px] w-full flex items-center lg:justify-between py-[9.5px] gap-[10px] lg:gap-0 border-b border-[#E9E7E7]">
      <img className="w-[30px] sm:w-fit" src={img} alt="avatar" />
      <span>
        <h3 className="font-[600] font-Montserrat">Mathematics</h3>
        <span className="flex gap-[10px] items-center font-Opensans">
          <p className="text-[12px] md:text-[14px] font-bold">
            Monday, April 10th
          </p>
          <p className="text-[14px]">{time}</p>
        </span>
      </span>
      <div className="hidden bg-[#E9E7E7] font-Opensans w-[100px] h-[40px] rounded-[15px] lg:flex justify-center gap-[5px] items-center">
        <p className="text-[14px]">{date} days</p>
        <CountDownIcon />
      </div>
    </div>
  );
};

export default UpcomingClass;
