import React, { useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useAuthContext } from "../../context/authContext";
import axios from "axios";
import { BASE_URL } from "../../config";

const CreditPayment = () => {
  const { setIsConfirmSelectionOpen } = useGlobalContext();
  const { user } = useAuthContext();

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet.
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    axios
      .post(
        `${BASE_URL}/payments/process`,
        {
          studentId: 3,
          subjectId: 1,
          description: "July session",
          token: token.id,
          amount: 20000.0,
          currency: "USD",
          paymentMethod: "credit card",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        console.log("Payment successful!");
        setIsConfirmSelectionOpen(true);
      })
      .catch((error) => {
        console.log("Payment failed");
      });

    setLoading(false);
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <div className="div">
        <label htmlFor="name">Name on Card:</label>
        <input className="input" type="text" id="name" />
      </div>

      <div className="div my-[20px]">
        <label htmlFor="num">Card Details:</label>
        <CardElement className="input" />
      </div>

      {/* <div className="flex gap-[40px] justify-between">
        <div className="flex items-center">
          <label htmlFor="exp_month" className="mr-[30px]">
            Expiration:
          </label>
          <input
            className="input flex-none w-[100px]"
            type="number"
            id="exp_month"
            placeholder="MM"
          />
          <span className="text-[25px] font-bold mx-[10px]">/</span>
          <input
            className="input flex-none w-[100px]"
            type="number"
            id="exp_year"
            placeholder="YY"
          />
        </div>

        <div className="flex items-center">
          <label style={{ width: "60px" }} htmlFor="cvv">
            CVV:
          </label>
          <input className="input flex-none w-[100px]" type="number" id="cvv" />
        </div>
      </div> */}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="ml-auto block w-fit p-[10px] rounded-[10px] bg-blue text-white font-Poppins font-[500]"
      >
        Confirm Payment
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default CreditPayment;
