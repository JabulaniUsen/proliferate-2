import React, { useEffect } from "react";
import { useGlobalContext } from "../context/globalContext";

const ErrorModal = () => {
  const { isErrModalOpen, setIsErrModalOpen, modalErr, setModalErr } =
    useGlobalContext();

  useEffect(() => {
    let timeout;
    if (modalErr.title !== "") {
      setIsErrModalOpen(true);
      // timeout = setTimeout(() => closeModal(), 3000);
    } else {
      setIsErrModalOpen(false);
    }

    // return () => clearTimeout(timeout);
  }, [modalErr]);

  const closeModal = () => {
    setIsErrModalOpen(false);
    setModalErr({ title: "", body: "" });
  };

  return (
    <div
      onClick={() => setIsErrModalOpen(false)}
      style={{ paddingTop: "0px" }}
      className={`${!isErrModalOpen && "hidden"} modal-bg flex items-center`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[40%] bg-white h-fit p-[30px] rounded-[16px] font-Opensans"
      >
        <h3 className="text-[24px] font-bold text-black">{modalErr.title}</h3>
        <p className="mt-[10px] mb-[20px] font-medium text-black">
          {modalErr.body}
        </p>
        <button
          onClick={closeModal}
          className="block mx-auto px-[20px] py-[6px] border-black border-[1px] rounded-[6px] text-bold"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
