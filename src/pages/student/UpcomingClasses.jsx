import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../context/globalContext";
import LoadingPage from "../../components/LoadingPage";
import { useUser } from "../../context/userContext";

const UpcomingClasses = () => {
  const { setIsReModalOpen } = useGlobalContext();
  const { classes, getClasses } = useUser();

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="classes"
    >
      <div>
        {classes == "loading" ? (
          <LoadingPage />
        ) : (
          <div>
            <div className="heading">
              <h1>Upcoming Classes</h1>
            </div>

            <div className="px-[30px] 2xl:px-[81px] pt-[20px]">
              <p className="text-[24px] font-[600] font-Montserrat">
                My Class Schedules
              </p>

              <div className="w-full overflow-x-auto">
                <table className="my-[40px] w-full  font-Poppins">
                  <thead className="text-[14px] font-bold ">
                    <tr>
                      <th align="left">Subject</th>
                      <th align="left">Tutor</th>
                      <th align="left">Schedule</th>
                      <th align="left" className="border-none"></th>
                    </tr>
                  </thead>

                  <tbody className="text-[14px]">
                    {Array.isArray(classes) &&
                      classes.map((item, i) => (
                        <tr key={i}>
                          <td align="left">{item.subjectTitle}</td>
                          <td align="left">{item.tutorName}</td>
                          <td align="left">{item.date}</td>
                          <td align="left" className="border-none">
                            <p
                              onClick={() => setIsReModalOpen(true)}
                              className="text-[#186BAD] cursor-pointer"
                            >
                              Reschedule
                            </p>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UpcomingClasses;

const subjects = [
  {
    Subject: "Computer Science",
    Tutor: "Professor Emily Johnson",
    Schedule: "Mon/Wed, 9:00 AM",
  },
  {
    Subject: "Spanish Language",
    Tutor: "Maria Rodriguez",
    Schedule: "Tue/Thu, 11:00 AM",
  },
  {
    Subject: "English Literature",
    Tutor: "David Smith",
    Schedule: "Mon/Fri, 2:00 PM",
  },
  {
    Subject: "Biology",
    Tutor: "Dr. Sarah Lee",
    Schedule: "Wed/Fri, 10:00 AM",
  },
  {
    Subject: "Mathematics",
    Tutor: "John Brown",
    Schedule: "Tue/Thu, 1:00 PM",
  },
  {
    Subject: "Psychology",
    Tutor: "Dr. Jessica Parker",
    Schedule: "Mon/Wed, 3:00 PM",
  },
  {
    Subject: "Marketing",
    Tutor: "Sarah Evans",
    Schedule: "Tue/Thu, 2:00 PM",
  },
  {
    Subject: "Web Development",
    Tutor: "Michael Thompson",
    Schedule: "Wed/Fri, 11:00 AM",
  },
  {
    Subject: "Art History",
    Tutor: "Emily Davis",
    Schedule: "Tue/Thu, 10:00 AM",
  },
  {
    Subject: "Yoga",
    Tutor: "Rachel Williams",
    Schedule: "Mon/Fri, 4:00 PM",
  },
];
