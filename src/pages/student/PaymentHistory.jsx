import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoCalendarClear as Cal } from "react-icons/io5";
import { useAuthContext } from "../../context/authContext";
import { fetchData } from "../../utils/fetchData";
import LoadingPage from "../../components/LoadingPage";
import { BASE_URL } from "../../config";

const PaymentHistory = () => {
  const { user } = useAuthContext();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchData(
      `${BASE_URL}/payments/student`,
      user.token
    )
      .then((res) => {
        setPayments(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pay-history">
      <div className="heading">
        <h1>Payment History</h1>
      </div>

      {loading ? (
        <LoadingPage />
      ) : (
        <div className="py-[40px] px-[30px] 2xl:px-[80px]">
          <div className="w-[60%] h-[46px] border border-[#B0B0B0] flex justify-between items-center gap-[20px] rounded-[8px] overflow-hidden">
            <input type="text" className="bg-transparent px-[8px]" />
            <button className="h-full px-[20px] bg-[#1D8EED] text-white flex items-center gap-[5px] font-[600] font-Montserrat">
              Search <FaSearch />
            </button>
          </div>

          <div className="mt-[20px] w-full overflow-x-auto">
            <table className="w-full border-collapse border border-[gray] font-Opensans">
              <thead className="text-[14px] font-bold ">
                <tr>
                  <th align="left">Date</th>
                  <th align="left">Description</th>

                  <th align="left">Amount</th>
                  <th align="left">Payment Method</th>
                  <th align="left">Status</th>
                </tr>
              </thead>

              <tbody className="text-[14px]">
                {payments.map((item, i) => (
                  <tr key={i}>
                    <td align="left">{item.date}</td>
                    <td align="left">{item.description}</td>
                    <td align="left">{item.amount}</td>
                    <td align="left">{item.paymentMethod}</td>
                    <td align="left">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;

const data = [
  {
    Date: "2024-03-01",
    Description: "January Session",
    Status: "Paid",
    Amount: "$50.00",
    PaymentMethod: "Credit Card",
  },
  {
    Date: "2024-03-05",
    Description: "February Session",
    Status: "Paid",
    Amount: "$40.00",
    PaymentMethod: "PayPal",
  },
  {
    Date: "2024-03-10",
    Description: "March Session",
    Status: "Paid",
    Amount: "$45.00",
    PaymentMethod: "Credit Card",
  },
  {
    Date: "2024-03-15",
    Description: "April Session",
    Status: "Paid",
    Amount: "$40.00",
    PaymentMethod: "PayPal",
  },
  {
    Date: "2024-03-20",
    Description: "May Session",
    Status: "Paid",
    Amount: "$50.00",
    PaymentMethod: "Credit Card",
  },
  {
    Date: "2024-03-25",
    Description: "June Session",
    Status: "Paid",
    Amount: "$40.00",
    PaymentMethod: "Credit Card",
  },
  {
    Date: "2024-04-01",
    Description: "July Session",
    Status: "Pending",
    Amount: "$45.00",
    PaymentMethod: "PayPal",
  },
  {
    Date: "2024-04-05",
    Description: "August Session",
    Status: "Completed",
    Amount: "$40.00",
    PaymentMethod: "Credit Card",
  },
  {
    Date: "2024-04-10",
    Description: "September Session",
    Status: "Pending",
    Amount: "$50.00",
    PaymentMethod: "PayPal",
  },
  {
    Date: "2024-04-15",
    Description: "October Session",
    Status: "Completed",
    Amount: "$40.00",
    PaymentMethod: "Credit Card",
  },
];
