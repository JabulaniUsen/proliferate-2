import React from "react";
import tutor from "../assets/tutorAvatar.png";

const Tutor = () => {
  return (
    <div className="border-b vsm:pr-[40px] py-[8px] pl-[16px] border-[#D1D1D1] flex items-center font-DMsans text-[14px]">
      <input
        className="h-[20px] w-[20px] border-[2px] border-[#D6D8DB] rounded-[6px] cursor-pointer"
        type="checkbox"
      />
      <span className="ml-[20px] flex items-center gap-[8px]">
        <img src={tutor} alt="tutor" />
        <p>Guy Hawkins</p>
      </span>
      <button className="ml-auto px-[12px] py-[4px] rounded-[20px] bg-[#D4F8D3]">
        Active
      </button>
    </div>
  );
};

export default Tutor;
