import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const TutorAddReport = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="heading">
        <h1>Report | Add</h1>
      </div>
      <div className="content">
        <div className="w-full flex justify-between items-center">
          <div className="px-[20px] flex gap-[20px] items-center text-[15px] font-Poppins">
            <button>All</button>
            <button className="text-[#D9D9D9]">Incomplete</button>
            <button className="text-[#D9D9D9]">Completed</button>
          </div>
          <div className="w-[300px] border border-black rounded-[20px] flex items-center">
            <input
              className="flex-1 border-none outline-none py-[4px] rounded-[20px] pl-[10px]"
              type="text"
              placeholder="What do you want to to search"
            />
            <button className="h-full w-[50px] grid place-items-center">
              <CiSearch />
            </button>
          </div>
        </div>

        <table className="mt-[50px] w-full table-padding">
          <thead>
            <tr>
              <th align="center"></th>
              <th align="left">Students</th>
              <th align="center">Subject</th>
              <th align="center">Status</th>
              <th align="center">Reports</th>
            </tr>
          </thead>
          <tbody>
            <StudentItem setIsOpen={setIsOpen} />
            <StudentItem setIsOpen={setIsOpen} />
            <StudentItem setIsOpen={setIsOpen} />
            <StudentItem setIsOpen={setIsOpen} />
            <StudentItem setIsOpen={setIsOpen} />
            <StudentItem setIsOpen={setIsOpen} />
            <StudentItem setIsOpen={setIsOpen} />
            <StudentItem setIsOpen={setIsOpen} />
            <StudentItem setIsOpen={setIsOpen} />
            <StudentItem setIsOpen={setIsOpen} />
          </tbody>
        </table>
      </div>

      <div
        onClick={() => setIsOpen(false)}
        className={`${isOpen ? "flex" : "hidden"} modal-bg2 items-center`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[500px] p-[30px] h-fit bg-white max-h-[90vh] overflow-y-auto"
        >
          <div className="h-fit">
            <h1 className="text-[24px] text-center text-[#186BAD]">
              Tutor Schedule | Single Session
            </h1>

            <div className="mt-[20px] mb-[40px] flex flex-col gap-[10px]">
              <div className="flex justify-between">
                <label htmlFor="name">Student</label>
                <select
                  className="w-[70%] border border-[#949494] px-[15px] py-[2px]"
                  name=""
                  id="name"
                >
                  <option value="">John Smith</option>
                </select>
              </div>

              <div className="flex justify-between">
                <label htmlFor="msg">Message</label>
                <textarea
                  className="w-[70%] resize-none h-[100px] border border-[#949494] px-[15px] py-[2px]"
                  name=""
                  id="msg"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-center gap-[20px] items-center">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-blue text-white font-medium px-[20px] py-[5px] rounded-[8px]"
              >
                Send
              </button>
              {/* <button
                onClick={() => setIsOpen(false)}
                className="border border-blue text-blue font-medium px-[20px] py-[5px] rounded-[8px]"
              >
                Upload Report
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorAddReport;

const StudentItem = ({ setIsOpen }) => {
  return (
    <tr className="group">
      <td align="center">
        <div className="size-[30px] rounded-full bg-blue"></div>
      </td>
      <td align="left">
        <p>John Smith</p>
      </td>
      <td align="center">
        <p>Mathematics</p>
      </td>
      <td align="center">
        <div>
          <div className="relative mb-[2px] w-[150px] h-[7px] bg-gray-200 rounded-[20px]">
            <div className="absolute w-[80%] h-full bg-blue left-0 top-0 rounded-[20px]"></div>
          </div>
          <p>80% Completed</p>
        </div>
      </td>
      <td
        onClick={() => setIsOpen(true)}
        className="cursor-pointer"
        align="center"
      >
        <p className="underline text-blue">Send</p>
      </td>
    </tr>
  );
};
