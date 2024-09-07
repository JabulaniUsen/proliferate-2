import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/globalContext";

const ConfirmSelection = () => {
  const {
    isConfirmSelectionOpen,
    setIsConfirmSelectionOpen,
    setIsMsgModalOpen,
    setModalMsg,
  } = useGlobalContext();

  const handleClick = () => {
    setIsConfirmSelectionOpen(false);
    setIsMsgModalOpen(true);
    setModalMsg({
      title: "Congratulations",
      body: "Congratulations! You've successfully selected Henry Arsene as your tutor for Mathematics. Your tutor will be notified of your selection, and they'll reach out to you shortly to discuss your learning goals and schedule your first session. Happy learning!",
    });
  };

  return (
    <div className={`${!isConfirmSelectionOpen && "hidden"}  modal-bg`}>
      <div className="w-[40%] bg-white h-fit p-[30px] rounded-[16px] font-Montserrat">
        <h3 className="text-[24px] font-bold text-center">Confirm Selection</h3>
        <p className="mt-[10px] mb-[20px] text-[14px] font-medium text-center">
          Take a Moment to review the{" "}
          <span className="text-[#DE4B18]">tutor</span> you selected
        </p>
        <div className="flex gap-[20px] items-center">
          <div className="w-[88px] h-[95px] border border-[#DE4B18] bg-blue"></div>
          <div className="text-[14px]">
            <p>
              <span className="font-medium">Name:</span>{" "}
              <span>Henry Arsene</span>
            </p>
            <p>
              <span className="font-medium">Subject:</span>{" "}
              <span>Mathematics</span>
            </p>
            <p>
              <span className="font-medium">Availability:</span>{" "}
              <span>Evenings (Mon/Wed/Fri)</span>
            </p>
          </div>
        </div>

        <div className="mt-[30px] flex justify-between">
          <Link
            to="/classes/addtutor"
            onClick={() => setIsConfirmSelectionOpen(false)}
            className="w-[48%] px-[20px] py-[10px] border border-black rounded-[6px] text-bold"
          >
            Change Tutor
          </Link>
          <button
            onClick={handleClick}
            className="w-[48%] px-[20px] py-[10px] bg-[#186BAD] rounded-[6px] text-bold text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSelection;
