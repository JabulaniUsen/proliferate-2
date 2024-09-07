import React, { useEffect } from "react";
import { useGlobalContext } from "../context/globalContext";

const MsgModal = () => {
  const { isMsgModalOpen, setIsMsgModalOpen, modalMsg, setModalMsg } =
    useGlobalContext();

  useEffect(() => {
    if (modalMsg.title !== "") {
      setIsMsgModalOpen(true);
    } else {
      setIsMsgModalOpen(false);
    }
  }, [modalMsg]);

  const closeModal = () => {
    setIsMsgModalOpen(false);
    setModalMsg({ title: "", body: "" });
  };

  return (
    <div className={`${!isMsgModalOpen && "hidden"}  modal-bg`}>
      <div className="w-[40%] bg-white h-fit p-[30px] rounded-[16px] font-Opensans">
        <h3 className="text-[24px] font-bold text-center">{modalMsg.title}</h3>
        <p className="mt-[10px] mb-[20px] font-medium text-center">
          {modalMsg.body}
        </p>
        <button
          onClick={closeModal}
          className="mx-auto block px-[72px] py-[16px] bg-[#186BAD] rounded-[6px] text-bold text-white"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default MsgModal;
