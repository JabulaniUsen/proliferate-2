import React from "react";

const Messages = ({ initials, name, msg, time }) => {
  return (
    <div className="py-[15px] border-b-[2px] border-[#ECECEC] flex items-center font-DMsans">
      <div className="bg-[#F0F7FF] h-[36px] w-[36px] rounded-[8px] grid place-items-center">
        <p className="text-[#0052B4] font-[500]">{initials}</p>
      </div>
      <div className="ml-[5px] 2xl:ml-[28.53px]">
        <h3 className="text-[15px] font-[600] text-[#333333]">{name}</h3>
        <p className="text-[10px] text-[#8A8A8A]">{msg}</p>
      </div>
      <p className="text-[10px] vsm:text-[14px] font-[600] text-[#8A8A8A] ml-auto">
        {time}
      </p>
    </div>
  );
};

export default Messages;
