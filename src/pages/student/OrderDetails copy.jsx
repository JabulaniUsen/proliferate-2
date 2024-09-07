import React, { useState } from "react";
import { useUser } from "../../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import axios from "axios";
import { subjectsList } from "../../data/subjects";

const OrderDetails2 = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { paymentDetails, setPaymentDetails } = useUser();
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [frequency, setFrequency] = useState("");
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState({});

  console.log(paymentDetails);

  const handleNext = () => {
    setLoading(true);
    axios
      .post(
        "https://formal-saloma-proliferate-41ba3b45.koyeb.app/api/v1/student/add-session",
        {
          subjectId: subjectsList.find(
            (item) => item.value == paymentDetails.subject
          ).id,
          tutorId: params.id,
          frequency: frequency,
          duration: "1 hour",
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setDetails(res.data);
        setLoading(false);
        setVisible(true);
        setPaymentDetails({ ...paymentDetails, ...res.data });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="heading">
        <h1>Order Details</h1>
      </div>

      <div className="content flex flex-row gap-[20px] font-Opensans">
        <div className="w-[48%]">
          <h1 className="font-Opensans text-[20px] font-semibold">
            Tutoring Details
          </h1>
          <p className="text-[14px]">
            Please fill the sessions preference and the Month you want tutorage
            for
          </p>

          <div className="my-[20px] p-[10px] h-[180px] bg-gray-100 flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px]">
              <p className="w-[90px] font-semibold">Name:</p>
              <p>
                {user?.firstName} {user?.lastName}
              </p>
            </div>

            <div className="flex items-center gap-[10px]">
              <p className="w-[90px] font-semibold">Subject:</p>
              <p className="capitalize">{paymentDetails?.subject}</p>
            </div>
            <div className="flex items-center gap-[10px]">
              <p className="w-[90px] font-semibold">Frequency:</p>
              <select
                className="w-[250px] border border-[gray] px-[2px] py-[3px] rounded-[4px]"
                id="fre"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option value="">Select Frequency</option>
                <option value="1">1 session</option>
                <option value="2">2 sessions</option>
                <option value="3">3 sessions</option>
              </select>
            </div>
            <div className="flex items-center gap-[10px]">
              <p className="w-[90px] font-semibold">Month:</p>
              <select
                value={paymentDetails.month}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    month: e.target.value,
                  })
                }
                className="w-[250px] border border-[gray] px-[2px] py-[3px] rounded-[4px]"
                id="month"
              >
                <option value="">Select Month</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleNext()}
            className="bg-blue w-[200px] mx-auto px-[30px] py-[10px] text-white font-medium grid place-items-center"
          >
            {loading ? (
              <div className="size-[20px] rounded-full animate-spin border-l border-l-white" />
            ) : (
              "GET QUOTATION"
            )}
          </button>
        </div>

        {visible && (
          <div className="w-[48%]">
            <h1 className="font-Opensans text-[20px] font-semibold">
              Pricing Details
            </h1>
            <p className="text-[14px]">
              Breakdown of the cost based on session rate and frequency.
            </p>

            <div className="my-[20px] p-[10px] h-[180px] bg-gray-100 flex flex-col gap-[10px]">
              <div className="flex items-center gap-[10px]">
                <p className="w-[250px] font-semibold">Rate per Session:</p>
                <p>$ {(details?.amount / parseFloat(frequency)).toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-[10px]">
                <p className="w-[250px] font-semibold">
                  Number of Sessions per Week:
                </p>
                <p>{frequency}</p>
              </div>

              <div className="flex items-center gap-[10px]">
                <p className="w-[250px] font-semibold">Total Monthly Price:</p>
                <p>$ {details?.amount}</p>
              </div>
            </div>

            <button
              onClick={() =>
                navigate(`/tutor/${params.id}/payment/credit-card`)
              }
              className="bg-blue mx-auto block px-[30px] py-[10px] text-white font-medium"
            >
              PROCEED
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails2;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
