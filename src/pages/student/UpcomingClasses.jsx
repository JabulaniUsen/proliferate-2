import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import { useGlobalContext } from "../../context/globalContext";
import LoadingPage from "../../components/LoadingPage";
import { useUser } from "../../context/userContext";

// Helper function to generate a random class ID
function generateClassId() {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
}

const UpcomingClasses = () => {
  const { setIsReModalOpen } = useGlobalContext();
  const { classes, getClasses } = useUser();
  const [selectedClass, setSelectedClass] = useState(null); // To store selected class for the modal
  const [isOpen, setIsOpen] = useState(false); // To control modal visibility
  const navigate = useNavigate(); 

  useEffect(() => {
    getClasses();
  }, []);

  const handleStartClass = () => {
    navigate(`online-classroom/${selectedClass.classId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="classes"
    >
      <div>
        {classes === "loading" ? (
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
                <table className="my-[40px] w-full font-Poppins">
                  <thead className="text-[14px] font-bold">
                    <tr>
                      <th align="left">Subject</th>
                      <th align="center">Tutor</th>
                      <th align="center">Schedule</th>
                      <th align="center">Class ID</th>
                      <th align="center">Start Class</th>
                      <th align="center">Reschedule</th>
                    </tr>
                  </thead>

                  <tbody className="text-[14px]">
                    {Array.isArray(classes) &&
                      classes.map((item, i) => (
                        <ScheduleItem 
                          key={i} 
                          item={{ ...item, classId: generateClassId() }} // Add random classId
                          setIsOpen={setIsOpen} 
                          setSelectedClass={setSelectedClass} 
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedClass && (
        <div
          onClick={() => setIsOpen(false)}
          className={`${isOpen ? "flex" : "hidden"} modal-bg2 items-center`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[500px] p-[30px] h-fit bg-white"
          >
            <h1 className="text-[24px] text-center text-[#186BAD]">
              Class Details
            </h1>
            <div className="mt-[20px] mb-[40px] flex flex-col gap-[10px]">
              <span className="flex justify-between border-b border-b-gray-400 pb-[1px] text-[15px]">
                <p className="font-bold">Tutor Name:-</p>
                <p>{selectedClass.tutorName}</p>
              </span>
              <span className="flex justify-between border-b border-b-gray-400 pb-[1px] text-[15px]">
                <p className="font-bold">Subject:-</p>
                <p>{selectedClass.subjectTitle}</p>
              </span>
              <span className="flex justify-between border-b border-b-gray-400 pb-[1px] text-[15px]">
                <p className="font-bold">Date:-</p>
                <p>{selectedClass.date}</p>
              </span>
              <span className="flex justify-between border-b border-b-gray-400 pb-[1px] text-[15px]">
                <p className="font-bold">Class ID:-</p>
                <p>{selectedClass.classId}</p>
              </span>
            </div>
            <div className="flex justify-center gap-[20px] items-center">
              <button
                onClick={handleStartClass}
                className="bg-blue text-white font-medium px-[20px] py-[5px] rounded-[8px]"
              >
                Start
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="border border-blue text-blue font-medium px-[20px] py-[5px] rounded-[8px]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default UpcomingClasses;

// ScheduleItem Component
const ScheduleItem = ({ item, setIsOpen, setSelectedClass }) => {
  const handleClick = () => {
    setSelectedClass(item); // Set the selected class data
    setIsOpen(true); // Open the modal
  };

  return (
    <tr onClick={handleClick} className="group">
      <td className="group-hover:bg-gray-200 cursor-pointer" align="left">
        <p>{item.subjectTitle}</p>
      </td>
      <td className="group-hover:bg-gray-200 cursor-pointer" align="center">
        <p>{item.tutorName}</p>
      </td>
      <td className="group-hover:bg-gray-200 cursor-pointer" align="center">
        <p>{item.date}</p>
      </td>
      <td className="group-hover:bg-gray-200 cursor-pointer" align="center">
        <p>{item.classId}</p>
      </td>
      <td className="group-hover:bg-gray-200 cursor-pointer" align="center">
        <button className="bg-blue text-white px-[10px] py-[5px] rounded-[5px]">
          Start Class
        </button>
      </td>
      <td className="group-hover:bg-gray-200 cursor-pointer" align="center">
        <p
          onClick={() => setIsReModalOpen(true)}
          className="text-[#186BAD] cursor-pointer"
        >
          Reschedule
        </p>
      </td>
    </tr>
  );
};
