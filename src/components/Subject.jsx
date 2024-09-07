import React from "react";

const Subject = ({ subject, value, percent }) => {
  return (
    <div className="subject mb-[30px]">
      <span className="mb-[10px] w-full flex justify-between items-center text-[14px] font-DMsans">
        <p>{subject}</p>
        <p className="text-black/50">{value}</p>
      </span>

      <div className="relative h-[8px] w-full bg-[#000000] rounded-[71.5px]">
        <div
          style={{ width: percent + "%" }}
          className="line absolute top-0 left-0 w-[50%] h-full bg-[#1F70B2] rounded-[71.5px]"
        >
          <div className="absolute right-[-15px] top-[50%] -translate-y-[50%] bg-[#1F70B2] h-[30px] w-[30px] rounded-full " />
        </div>
      </div>
    </div>
  );
};

export default Subject;
