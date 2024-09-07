import React from "react";
import { useGlobalContext } from "../../context/globalContext";

const BankTransferPayment = () => {
  const { setIsConfirmSelectionOpen } = useGlobalContext();
  return (
    <>
      <ul className="font-Montserrat text-[18px] 2xl:text-[24px]">
        <p className="font-bold mb-[10px]"> Bank Transfer Information:</p>
        <li className="ml-[10px] list-disc list-inside">
          <span className="font-bold">Bank Name:</span> Wema Bank
        </li>
        <li className="ml-[10px] list-disc list-inside">
          <span className="font-bold">Account Name:</span> Proliferate ai
        </li>
        <li className="ml-[10px] list-disc list-inside">
          <span className="font-bold">Account Number:</span> 0918273625
        </li>
        <li className="ml-[10px] list-disc list-inside">
          <span className="font-bold">Routing Number (if applicable):</span>{" "}
          SWG283645
        </li>
      </ul>

      <button
        onClick={() => setIsConfirmSelectionOpen(true)}
        className="ml-auto w-fit p-[10px] rounded-[10px] bg-blue text-white font-Poppins font-[500]"
      >
        Confirm Payment
      </button>
    </>
  );
};

export default BankTransferPayment;
