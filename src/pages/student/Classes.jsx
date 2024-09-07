import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Star from "../../components/Star";
import { useAuthContext } from "../../context/authContext";
import { fetchData } from "../../utils/fetchData";
import LoadingPage from "../../components/LoadingPage";
import { BASE_URL } from "../../config";

const Classes = () => {
  const { user } = useAuthContext();

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchData(
      `${BASE_URL}/student/schedule`,
      user.token
    )
      .then((res) => {
        setClasses(res);
        console.log(res);
        
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="classes"
    >
      <div>
        {loading ? (
          <LoadingPage />
        ) : (
          <>
            <div className="w-full pt-[57.58px] pl-[30px] 2xl:pl-[81px] pb-[33.5px] border-b border-[#969696]">
              <h1 className="font-Montserrat font-bold text-[32px]">
                My Classes
              </h1>
            </div>

            <div className="px-[30px] 2xl:px-[81px] pt-[20px]">
              <p className="text-[24px] font-[600] font-Montserrat">
                My Class Schedules
              </p>

              <div className="w-full overflow-x-auto">
                <table className="my-[40px] w-full border-collapse border border-[red] font-Poppins">
                  <thead className="text-[14px] font-bold ">
                    <tr>
                      <th align="left">Subject</th>
                      <th align="left">Tutor</th>
                      <th align="left">Schedule</th>
                      <th align="left">Ratings</th>
                    </tr>
                  </thead>

                  <tbody className="text-[14px]">
                    {classes.map((item, i) => (
                      <tr key={i}>
                        <td align="left">{item.subjectTitle}</td>
                        <td align="left">{item.tutorName}</td>
                        <td align="left">{item.schedule}</td>
                        <td align="left">
                          <span className="flex items-center gap-[2px] text-[17px] text-[gold]">
                            {[...Array(Math.round(item.rating))].map((_, i) => (
                              <Star key={i} filled={true} />
                            ))}
                            {[...Array(5 - Math.round(item.rating))].map(
                              (_, i) => (
                                <Star key={i} filled={false} />
                              )
                            )}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Classes;

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
