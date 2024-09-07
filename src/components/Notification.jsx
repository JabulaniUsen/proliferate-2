import React from "react";
import { FaRegTrashCan as FaTrash } from "react-icons/fa6";
import avatar from "../assets/noti-avatar.png";

const Notification = () => {
  return (
    <div className="flex items-center">
      <input className="w-[20px] h-[20px]" type="checkbox" />
      <img
        className="hidden vsm:block ml-[10px] md:ml-[20px] mr-[15px] md:mr-[25px] w-[50px] md:w-[73px] h-[50px] md:h-[73px]"
        src={avatar}
        alt="avatar"
      />
      <span className="flex-1 ml-[10px] vsm:ml-0 mr-[20px] text-[12px] md:text-[14px] font-Opensans">
        <p>
          A new assignment has been posted for your science class. You are
          required to research and submit a paper on "Climate Change and Its
          Effects" by the due date.
        </p>
        <p className="mt-[10px]">45 mins ago</p>
      </span>
      <FaTrash className="text-[#D9734C] text-[18px]" />
    </div>
  );
};

export default Notification;
