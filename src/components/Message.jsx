import React from "react";

const Message = ({ isReceived }) => {
  return (
    <span
      className={`${
        isReceived ? "bg-[#186BAD]" : "bg-[#67C4CE] ml-auto"
      } w-[55%] h-[34px] rounded-[6px] px-[10px] flex items-center`}
    >
      <p className="text-[10px] font-medium font-Poppins text-white">
        Lorem ipsum dolor sit amet consectetur ..........
      </p>
    </span>
  );
};

export default Message;
