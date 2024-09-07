import React from "react";
import {
  MdKeyboardDoubleArrowLeft as ArrowLeft,
  MdKeyboardDoubleArrowRight as ArrowRight,
} from "react-icons/md";
import TestScore from "../../components/TestScore";
import { motion } from "framer-motion";

const ProgressTracker = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="progress-tracker w-full"
    >
      <div className="w-full pt-[57.58px] pl-[30px] 2xl:pl-[81px] pb-[33.5px] border-b border-[#969696]">
        <h1 className="font-Montserrat font-bold text-[32px]">
          Progress Tracker
        </h1>
      </div>

      <div className="mb-[30px] px-[30px] 2xl:px-[81px]">
        <div className="mt-[18.5px] sm:flex items-center justify-between">
          <h3 className="text-[24px] font-[600] font-Montserrat">
            Quiz and Test Scores:
          </h3>
          <div className="page-nav flex items-center gap-[10px]">
            <ArrowLeft />
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <ArrowRight />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="w-[800px] xmd:w-full mt-[28px] rounded-[10px] h-fit border-[2px] border-[#000000]/10 px-[20px] py-[33px]">
            <table className="w-full font-Poppins">
              <thead className="text-[12px] font-normal text-[#757575] ">
                <tr>
                  <th align="left" className="pl-[10px]">
                    Test
                  </th>
                  <th align="left">Marks</th>
                  <th align="center">Questions attempted</th>
                  <th align="center">Correct</th>
                  <th align="center">Wrong</th>
                  <th align="left">Result</th>
                </tr>
              </thead>

              <tbody className="">
                <TestScore subject="Maths" upcoming={true} />
                <TestScore subject="English" />
                <TestScore subject="Science" />
                <TestScore subject="French" />
                <TestScore subject="Maths" fail={true} />
                <TestScore subject="English" />
                <TestScore subject="ICT" />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressTracker;
