import React from "react";
import { useGlobalContext } from "../../context/globalContext";

const PaypalPayment = () => {
  const { setIsConfirmSelectionOpen } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="div">
        <label htmlFor="paypal">PayPal Email:</label>
        <input className="input" type="text" id="paypal" />
      </div>

      <button
        onClick={() => setIsConfirmSelectionOpen(true)}
        className="mt-[20px] ml-auto block w-fit p-[10px] rounded-[10px] bg-blue text-white font-Poppins font-[500]"
      >
        Confirm Payment
      </button>
    </form>
  );
};

export default PaypalPayment;
