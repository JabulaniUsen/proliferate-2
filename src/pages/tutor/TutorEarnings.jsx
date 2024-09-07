import React, { useEffect, useState } from "react";
import { IoCalendarClear as Cal } from "react-icons/io5";
import { fetchData } from "../../utils/fetchData";
import { useAuthContext } from "../../context/authContext";
import { MdOutlineContentCopy as Copy } from "react-icons/md";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";


const TutorEarnings = () => {
  const { user } = useAuthContext();

  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchData(
      `${BASE_URL}/payments/tutor`,
      user.token
    )
      .then((res) => {
        console.log(res);
        setEarnings(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="heading">
        <h1>Earnings History</h1>
      </div>
      <div className="content">
        <div className="flex items-center gap-[30px]">
          <p>Search for Transaction:</p>
          <span className="flex-1 flex items-center gap-[20px]">
            <input
              className="flex flex-1 border border-[#949494] rounded-[4px] px-[20px] py-[4px]"
              type="text"
              placeholder="Search by date, student name, amount..."
            />
            <button className="rounded-[8px] bg-blue text-white font-medium px-[20px] py-[4px] ">
              Search
            </button>
          </span>
        </div>
        {/* <div className="my-[30px] flex items-center gap-[10px]">
          From
          <span className="flex items-center gap-[3px] bg-[#EDEDF5] rounded-[5px] px-[10px] py-[3px] text-[#3C3C3C]">
            <Cal />
            <p>12-01-2023</p>
          </span>
          to
          <span className="flex items-center gap-[3px] bg-[#EDEDF5] rounded-[5px] px-[10px] py-[3px] text-[#3C3C3C]">
            <Cal />
            <p>12-01-2023</p>
          </span>
        </div> */}

        <table className="earnings-table mt-[30px] w-full font-Inter">
          <thead>
            <tr>
              <th align="center">S.No.</th>
              <th align="center">Student Name</th>
              <th align="center">Date & Time</th>
              <th align="center">Transaction ID</th>
              <th align="center">Amount</th>
              <th align="center">No. of Classes</th>
              <th align="center">Payment Method</th>
            </tr>
          </thead>
          <tbody className="border border-[#DDDDDD] rounded-[5px]">
            {earnings.map((earning, i) => (
              <Earning key={i} earning={earning} i={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TutorEarnings;

const Earning = ({ earning, i }) => {
  function copyTextToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(function () {
        toast("Copied");
      })
      .catch(function (error) {
        console.error("Failed to copy text: ", error);
      });
  }

  return (
    <tr className="group">
      <td align="center">
        <p>{i + 1}</p>
      </td>
      <td align="center">
        <p>{earning.studentName}</p>
      </td>
      <td align="center">
        <p>{earning.date}</p>
      </td>
      <td align="center">
        <div className="flex justify-center items-center gap-[5px]">
          <p>{earning.transactionId.slice(0, 2)}...</p>
          <Copy
            onClick={() => {
              copyTextToClipboard(earning.transactionId);
            }}
            className="text-green-600 cursor-pointer"
          />
        </div>
      </td>
      <td align="center">
        <p className="text-[#40997E] font-[500]">$ {earning.amount}</p>
      </td>
      <td align="center">
        <p>{earning.noOfClasses}</p>
      </td>
      <td align="center">
        <p>{earning.paymentMethod}</p>
      </td>
      <td align="center">
        <p className="text-[#2E8760] font-bold">Success</p>
      </td>
    </tr>
  );
};
