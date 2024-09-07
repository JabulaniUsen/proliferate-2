import React from "react";

const TestScore = ({ subject, fail, upcoming }) => {
  return (
    <tr className="border-y border-[#E0E0E0]">
      <td align="left" className="pl-[10px]">
        <p className="font-medium">{subject} monthly test</p>
        <span className="flex items-center gap-[10px] text-[12px] text-[#757575]">
          <p>Monday, 23 April</p>
          <p>3:30 PM - 6:00 PM</p>
        </span>
      </td>
      <td className={upcoming && "opacity-0"} align="left">
        <p className="font-medium">90/100</p>
      </td>
      <td className={upcoming && "opacity-0"} align="center">
        <p className="font-medium">98/100</p>
      </td>
      <td className={upcoming && "opacity-0"} align="center">
        <p className="font-medium">90</p>
      </td>
      <td className={upcoming && "opacity-0"} align="center">
        <p className="font-medium">8</p>
      </td>
      {upcoming ? (
        <td align="left">
          <button className="px-[23px] py-[4px] text-[#F14747] rounded-[6px] border bg-[#F147474D] border-[#F14747]">
            Upcoming
          </button>
        </td>
      ) : (
        <td align="left">
          <button
            className={`${
              !fail
                ? "bg-[#2FD74A4D] border-[#2FD74A] text-[#2FD74A]"
                : "bg-[#F147474D] border-[#F14747] text-[#F14747]"
            } px-[23px] py-[4px]  rounded-[6px] border`}
          >
            {!fail ? "Pass" : "Fail"}
          </button>
        </td>
      )}
    </tr>
  );
};

export default TestScore;
