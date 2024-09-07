import React from "react";
import { CgNotes } from "react-icons/cg";
import { motion } from "framer-motion";
import { BsFillBarChartFill, BsPencilFill } from "react-icons/bs";
import { HiMiniUserPlus } from "react-icons/hi2";

const TutorOverview = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="heading">
        <h1>Overview</h1>
      </div>

      <div className="py-[20px] px-[30px] 2xl:px-[50px] flex flex-col md:flex-row justify-between gap-[80px] border-b border-[#969696]">
        <div className="w-[55%]">
          <div className="px-[10px] flex justify-between items-center">
            <h1 className="font-Montserrat font-medium text-[24px]">
              Upcoming Classes
            </h1>
            <button className="text-[14px] font-Opensans text-[#09BCFF]">
              See all
            </button>
          </div>

          <table className="w-full collapse-red text-[14px] border-[1px] border-[red] border-collapse">
            <thead>
              <tr>
                <th align="left">Date</th>
                <th align="left">Student Name</th>
                <th align="left">Subject</th>
                <th align="left">Time</th>
                <th align="left">Location</th>
              </tr>
            </thead>
            <tbody>
              <ClassesItem />
              <ClassesItem />
              <ClassesItem />
            </tbody>
          </table>
        </div>

        <div className="flex-1 w-fit ">
          <div className="px-[10px] border-b border-[#969696] flex justify-between items-center">
            <h1 className="font-Montserrat font-medium text-[24px]">
              Assignments
            </h1>
            <button className="text-[14px] font-Opensans text-[#09BCFF]">
              See all
            </button>
          </div>

          <div className="">
            <AssignmentItem />
            <AssignmentItem />
            <AssignmentItem />
          </div>
        </div>
      </div>

      <div className="py-[20px] px-[30px] 2xl:px-[50px] flex flex-col md:flex-row justify-between gap-[80px]">
        <div className="w-[55%]">
          <div className="border-b border-[#969696] px-[10px] flex justify-between items-center">
            <h1 className="font-Montserrat font-medium text-[24px]">
              Tutor Performance Overview
            </h1>
            <button className="text-[14px] font-Opensans text-[#09BCFF]">
              See all
            </button>
          </div>

          <div className="mt-[20px] flex flex-wrap gap-[10px]">
            {overviewData.map((data, i) => (
              <OverviewItem key={i} data={data} />
            ))}
          </div>
        </div>

        <div className="flex-1 w-fit ">
          <div className="px-[10px] flex justify-between items-center">
            <h1 className="font-Montserrat font-medium text-[24px]">
              Attendance
            </h1>
            <button className="text-[14px] font-Opensans text-[#09BCFF]">
              See all
            </button>
          </div>

          <table className="w-full collapse-red text-[14px] border-collapse">
            <thead>
              <tr>
                <th align="left">Month</th>
                <th align="center">Scheduled Sessions</th>
                <th align="center">Attended Sessions</th>
                <th align="center">Students Absences</th>
                <th align="center">Tutors Absences</th>
              </tr>
            </thead>
            <tbody>
              <AttendanceItem />
              <AttendanceItem />
              <AttendanceItem />
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default TutorOverview;

const ClassesItem = () => {
  return (
    <tr>
      <td align="left">
        <p>Monday, April 10th</p>
      </td>
      <td align="left">
        <p>John Smith</p>
      </td>
      <td align="left">
        <p>Mathematics</p>
      </td>
      <td align="left">
        <p>3:00 PM - 4:30 PM</p>
      </td>
      <td align="left">
        <p>Online</p>
      </td>
    </tr>
  );
};

const AssignmentItem = () => {
  return (
    <div className="w-fit pl-[8px] py-[12px] flex items-center gap-[19px] border-b-[2px] border-[#ECECEC]">
      <CgNotes className="text-[blue]" />
      <div className="text-[14px] font-Opensans">
        <h3 className="text-[#272835]">Science | Biological Benefits</h3>
        <p className="text-[#9E9E9E]">04 May, 09:20AM</p>
      </div>
    </div>
  );
};

const OverviewItem = ({ data }) => {
  return (
    <div
      style={{ backgroundColor: data.color }}
      className="w-[180px] h-[184px] rounded-[16px] p-[20px] flex flex-col justify-between"
    >
      <div
        style={{ backgroundColor: data.color2 }}
        className="size-[40px] rounded-full grid place-items-center"
      >
        {data.icon}
      </div>
      <p className="text-[24px] text-[#151D48] font-Poppins font-[600]">
        {data.value}
      </p>
      <span>
        <p className="text-[14px] font-Opensans">{data.text}</p>
        <p className="font-Poppins font-[500] text-[12px] text-[#4079ED]">
          {data.change} from yesterday
        </p>
      </span>
    </div>
  );
};

const AttendanceItem = () => {
  return (
    <tr>
      <td align="left">
        <p>February</p>
      </td>
      <td align="center">
        <p>35</p>
      </td>
      <td align="center">
        <p>35</p>
      </td>
      <td align="center">
        <p>35</p>
      </td>
      <td align="center">
        <p>35</p>
      </td>
    </tr>
  );
};

const overviewData = [
  {
    color: "#FFE2E5",
    color2: "#FA5A7D",
    icon: <BsFillBarChartFill color="white" />,
    value: "$1K",
    text: "Total Earnings",
    change: "+8%",
  },
  {
    color: "#FFF4DE",
    color2: "#FF947A",
    icon: <CgNotes color="white" />,
    value: "300",
    text: "Total Sessions",
    change: "+8%",
  },
  {
    color: "#DCFCE7",
    color2: "#3CD856",
    icon: <BsPencilFill color="white" />,
    value: "5",
    text: "Completed Sessions",
    change: "+8%",
  },
  {
    color: "#F3E8FF",
    color2: "#BF83FF",
    icon: <HiMiniUserPlus color="white" />,
    value: "8",
    text: "New Students",
    change: "+8%",
  },
];
