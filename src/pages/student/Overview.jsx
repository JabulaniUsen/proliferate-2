import React from "react";
import avatar1 from "../../assets/avatar1.png";
import avatar2 from "../../assets/avatar2.png";
import avatar3 from "../../assets/avatar3.png";
import UpcomingClass from "../../components/UpcomingClass";
import { CgNotes } from "react-icons/cg";
import Tutor from "../../components/Tutor";
import Messages from "../../components/Messages";
import Subject from "../../components/Subject";
import { motion } from "framer-motion";

const Overview = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="heading">
        <h1>Overview</h1>
      </div>

      <div className="pt-[41.5px] pb-[41.5px] pl-[30px] 2xl:pl-[82px] flex flex-col md:flex-row gap-[30px] justify-between xl:gap-0 border-b border-[#969696]">
        <div className="w-fit lg:w-[62%] xl:w-[47%]">
          <div className="pr-[40px] flex justify-between items-center">
            <h1 className="font-Montserrat font-[600] text-[24px]">
              Upcoming Classes
            </h1>
            <button className="text-[14px] font-Opensans text-[#09BCFF]">
              See all
            </button>
          </div>

          <div>
            <UpcomingClass img={avatar1} time="3:00 PM - 4:30 PM" date="10" />
            <UpcomingClass img={avatar2} time="6:00 PM - 7:30 PM" date="12" />
            <UpcomingClass img={avatar3} time="3:00 PM - 4:30 PM" date="20" />
          </div>
        </div>

        <div className="flex-none w-fit md:w-[40%] xl:w-[33%]">
          <div className="lg:pr-[40px] flex justify-between items-center">
            <h1 className="font-Montserrat font-[600] text-[24px]">
              Assignments
            </h1>
            <button className="text-[14px] font-Opensans text-[#09BCFF]">
              See all
            </button>
          </div>

          <div className="h-[150px]">
            <div className="w-fit pl-[8px] py-[12px] flex items-center gap-[19px] border-b-[2px] border-[#ECECEC]">
              <CgNotes className="text-[blue]" />
              <div className="text-[14px] font-Opensans">
                <h3 className="text-[#272835]">
                  Science | Biological Benefits
                </h3>
                <p className="text-[#9E9E9E]">04 May, 09:20AM</p>
              </div>
            </div>
            <div className="w-fit pl-[8px] py-[12px] flex items-center gap-[19px] border-b-[2px] border-[#ECECEC]">
              <CgNotes className="text-[blue]" />
              <div className="text-[14px] font-Opensans">
                <h3 className="text-[#272835]">
                  Science | Biological Benefits
                </h3>
                <p className="text-[#9E9E9E]">04 May, 09:20AM</p>
              </div>
            </div>
            <div className="w-fit pl-[8px] py-[12px] flex items-center gap-[19px] border-b-[2px] border-[#ECECEC]">
              <CgNotes className="text-[blue]" />
              <div className="text-[14px] font-Opensans">
                <h3 className="text-[#272835]">
                  Science | Biological Benefits
                </h3>
                <p className="text-[#9E9E9E]">04 May, 09:20AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-[28.5px] px-[30px] md:pl-[30px] 2xl:pl-[82px] flex flex-wrap gap-y-[30px] gap-x-[30px]">
        <div className="w-full md:w-[300px]">
          <div className="border-b border-[#D1D1D1] pb-[6px] vsm:pr-[60px] flex justify-between items-center">
            <h1 className="font-Montserrat font-[600] text-[24px]">
              My Tutors
            </h1>
            <button className="text-[14px] font-Opensans text-[#09BCFF]">
              See all
            </button>
          </div>
          <div>
            <Tutor />
            <Tutor />
            <Tutor />
            <Tutor />
            <Tutor />
          </div>
        </div>

        <div className="w-full md:w-[300px]">
          <div className="border-b border-[#D1D1D1] pb-[6px] flex justify-between items-center">
            <h1 className="font-Montserrat font-[600] text-[24px]">Messages</h1>
            <button className="text-[14px] font-Opensans text-[#09BCFF]">
              See all
            </button>
          </div>
          <div>
            <Messages
              initials="AA"
              name="Adepoju Ademola"
              msg="Hello, Mr John i am yet to get your class b res..."
              time="10:25 am"
            />
            <Messages
              initials="BP"
              name="Badiru Pomile"
              msg="Please schedule your class test."
              time="12:35 pm"
            />
            <Messages
              initials="T"
              name="Emmanuel John"
              msg="Please resend last session statistic"
              time="4:30 pm"
            />
          </div>
        </div>

        <div className="w-full md:w-[350px]">
          <h1 className="pb-[24px] font-Montserrat font-[600] text-[24px]">
            Monthly Class Attendance
          </h1>
          <div>
            <Subject subject="Mathematics" value="25" percent="65" />
            <Subject subject="Science" value="30" percent="70" />
            <Subject subject="English" value="20" percent="60" />
            <Subject subject="French" value="45" percent="80" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Overview;
