import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/globalContext";

const RescheduleModal = () => {
  const { isReModalOpen, setIsReModalOpen } = useGlobalContext();

  return (
    <div className={`${!isReModalOpen && "hidden"}  modal-bg`}>
      <div className="w-[40%] bg-white h-fit p-[30px] rounded-[16px] font-Opensans">
        <h3 className="text-[24px] font-bold text-center">Reschedule Class </h3>
        <p className="mt-[10px] mb-[20px] text-[17px] font-medium">
          You can reshedule up to 3 sessions at once. To Proceed, Simply select
          the date(s) in the calendar.
        </p>
        <div className="flex justify-between">
          <button
            onClick={() => setIsReModalOpen(false)}
            className="px-[58px] py-[16px] border border-black rounded-[6px] text-bold"
          >
            Cancel
          </button>
          <Link
            onClick={() => setIsReModalOpen(false)}
            to="/classes/reschedule-class"
            className="px-[72px] py-[16px] bg-[#186BAD] rounded-[6px] text-bold text-white"
          >
            Proceed
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RescheduleModal;
