import React from "react";
import { useUser } from "../../context/userContext";
import { useNavigate, useParams } from "react-router-dom";

const OrderDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { paymentDetails, setPaymentDetails } = useUser();

  const handleNext = () => {
    navigate(`/tutor/${params.id}/payment/credit-card`);
  };

  return (
    <div>
      <div className="heading">
        <h1>Order Details</h1>
      </div>

      <div className="content flex flex-col gap-[20px] font-Opensans">
        <div>
          <h1 className="font-Opensans text-[24px] font-bold">
            Student Information
          </h1>
          <p className="mb-[10px]">
            Details about the student receiving the tutoring services.
          </p>

          <p>
            <strong>Name:</strong> <span>Hassan Basit</span>
          </p>
        </div>

        <div>
          <h1 className="font-Opensans text-[24px] font-bold">
            Tutoring Details
          </h1>
          <p className="mb-[10px]">
            Information regarding the grade, subject, and session frequency.
          </p>
          <p>
            <strong>Grade:</strong> <span>Grade 7</span>
          </p>
          <p>
            <strong>Subject:</strong> <span>English</span>
          </p>
          <div>
            <label htmlFor="fre" className="font-bold">
              Frequency:
            </label>{" "}
            <select
              className="w-[250px] border border-[gray] px-[2px] py-[3px] rounded-[4px]"
              id="fre"
            >
              <option value="">Select Frequency</option>
              <option value="1">1 session</option>
              <option value="2">2 sessions</option>
              <option value="3">3 sessions</option>
            </select>
          </div>
          <div className="mt-[4px]">
            <label className="font-bold" htmlFor="month">
              Select Month:
            </label>{" "}
            <select
              value={paymentDetails.month}
              onChange={(e) =>
                setPaymentDetails({ ...paymentDetails, month: e.target.value })
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

        <div>
          <h1 className="font-Opensans text-[24px] font-bold">
            Pricing Details
          </h1>
          <p className="mb-[10px]">
            Breakdown of the cost based on session rate and frequency.
          </p>

          <p>
            <strong>Rate per Session:</strong> <span>$2000</span>
          </p>
          <p>
            <strong>Number of Sessions per Week:</strong> <span>2</span>
          </p>
          <p>
            <strong>Total Weekly Price:</strong> <span>$4000</span>
          </p>
          <p>
            <strong>Total Monthly Price:</strong> <span>$16000</span>
          </p>
        </div>

        <button
          onClick={handleNext}
          className="bg-blue px-[30px] py-[10px] text-white mx-auto font-medium"
        >
          PROCEED
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;

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
