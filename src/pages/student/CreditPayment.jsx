import React, { useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useAuthContext } from "../../context/authContext";
import axios from "axios";
import { useUser } from "../../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";

const CreditPayment = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { setIsConfirmSelectionOpen, setIsLoaderOpen } = useGlobalContext();
  const { paymentDetails, setPaymentDetails } = useUser();
  const { user } = useAuthContext();

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setIsLoaderOpen(true);

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
      console.log(error);
      return;
    }

    axios
      .post(
        `${BASE_URL}/payments/process`,
        {
          sessionId: paymentDetails.sessionId,
          description: `${paymentDetails.month} session`,
          token: "tok_visa",
          amount: paymentDetails.amount,
          currency: "USD",
          paymentMethod: "credit card",
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Payment Made");
        setLoading(false);
        setIsLoaderOpen(false);

        navigate("/payment/history");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setIsLoaderOpen(false);
      });
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
