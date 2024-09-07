import React from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/globalContext";

const SubjectDetails = () => {
  const {
    isSubjectDetailsOpen,
    setIsSubjectDetailsOpen,
    editEvent,
    setOpenEditModal,
  } = useGlobalContext();

  const handleClick = () => {
    setOpenEditModal(true);
    setIsSubjectDetailsOpen(false);
  };

  return (
    <div className={`${!isSubjectDetailsOpen && "hidden"} modal-bg`}>
      <div className="relative w-[40%] bg-white h-fit p-[30px] rounded-[16px] font-Montserrat">
        <button
          onClick={() => setIsSubjectDetailsOpen(false)}
          className="absolute top-[20px] right-[20px] text-[20px] text-[red]"
        >
          <FaTimes />
        </button>
        <h3 className="text-[24px] font-bold text-center">Class Details</h3>

        <div className="mt-[20px]">
          <p>
            <span className="font-medium">Subject:</span>{" "}
            <span>{editEvent?.subject}</span>
          </p>
          <p>
            <span className="font-medium">Tutor:</span>{" "}
            <span>{editEvent?.tutor}</span>
          </p>
          <p>
            <span className="font-medium">Date:</span>{" "}
            <span>{new Date(editEvent?.start).toLocaleDateString()}</span>
          </p>
          <p>
            <span className="font-medium">Time:</span>{" "}
            <span>{new Date(editEvent?.start).toLocaleTimeString()}</span>
          </p>
        </div>

        <button
          onClick={handleClick}
          className="mt-[30px] w-full flex justify-center py-[10px] border border-black rounded-[6px] text-bold"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default SubjectDetails;
