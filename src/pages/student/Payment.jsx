import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import Star from "../../components/Star";
import userAvatar from "../../assets/userAvatar.png";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useUser } from "../../context/userContext";
import { useAuthContext } from "../../context/authContext";
import axios from "axios";
import { toast } from "react-toastify";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const { user } = useAuthContext();
  const { paymentDetails, setPaymentDetails } = useUser();
  const location = useLocation();
  const params = useParams();

  const [currMethod, setCurrMethod] = useState(1);

  const tutorpage = location.pathname.includes("tutor");
  const baseRoute = tutorpage ? "/tutor/SandraGladys" : "";

  const { subject, tutor } = { ...paymentDetails };

  return (
    <div className="payment">
      <div className="heading">
        <h1>{tutorpage && "Make"} Payment</h1>
      </div>

      <div className="py-[40px] px-[30px] 2xl:px-[80px]">
        {tutorpage && (
          <div className="mb-[30px] flex gap-[50px] items-center font-Montserrat">
            <div className="w-[166px] h-[172px] ">
              {tutor?.profileImage ? (
                <img
                  className="size-full object-cover rounded-full"
                  src={`data:image/jpeg;base64,${tutor.profileImage}`}
                  alt="icon"
                />
              ) : (
                <img
                  className="size-full object-cover rounded-full"
                  src={userAvatar}
                  alt="icon"
                />
              )}
            </div>
            <div>
              <p className="font-bold">{tutor.fullName}</p>
              <p className="capitalize">{subject} Tutor</p>
              <span className="flex text-[#DE4B18] gap-[5px]">
                {Array.from({ length: Math.round(tutor?.rating) }).map(
                  (_, i) => (
                    <Star key={i} filled />
                  )
                )}
                {Array.from({ length: Math.round(5 - tutor?.rating) }).map(
                  (_, i) => (
                    <Star key={i} />
                  )
                )}
              </span>
            </div>
          </div>
        )}

        <div className="form w-[70%] flex flex-col gap-[30px]">
          <div className="div">
            <label htmlFor="method">Payment Method:</label>
            <div className="flex items-center gap-[20px]">
              <Link
                onClick={() => setCurrMethod(1)}
                to={baseRoute + "/payment/credit-card"}
              >
                <Radio checked={currMethod === 1 && true} />
                <p className="whitespace-nowrap">Credit Card</p>
              </Link>
              <Link
                onClick={() => setCurrMethod(2)}
                to={baseRoute + "/payment/debit-card"}
              >
                <Radio checked={currMethod === 2 && true} />
                <p className="whitespace-nowrap">Debit Card</p>
              </Link>
              <Link
                onClick={() => setCurrMethod(3)}
                to={baseRoute + "/payment/paypal"}
              >
                <Radio checked={currMethod === 3 && true} />
                <p>Paypal</p>
              </Link>
              <Link
                onClick={() => setCurrMethod(4)}
                to={baseRoute + "/payment/bank-transfer"}
              >
                <Radio checked={currMethod === 4 && true} />
                <p>Transfer</p>
              </Link>
            </div>
          </div>

          <Elements stripe={stripePromise}>
            <Outlet />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;

const Radio = ({ checked = false }) => {
  return (
    <div className="size-[13px] rounded-full border border-black flex justify-center items-center">
      {checked && <div className="size-[7px] rounded-full bg-blue"></div>}
    </div>
  );
};
