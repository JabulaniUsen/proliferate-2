import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useAuthContext } from "../../context/authContext";
import LoadingPage from "../../components/LoadingPage";

// Dummy data
const dummySchedules = [
  {
    date: "Monday, April 10th",
    studentName: "John Smith",
    subject: "Mathematics",
    time: "3:00 PM - 4:30 PM",
    location: "Online",
    classId: generateClassId(),
  },
  {
    date: "Tuesday, April 11th",
    studentName: "Alice Johnson",
    subject: "Physics",
    time: "10:00 AM - 11:30 AM",
    location: "Online",
    classId: generateClassId(),
  },
  {
    date: "Wednesday, April 12th",
    studentName: "Bob Williams",
    subject: "Chemistry",
    time: "1:00 PM - 2:30 PM",
    location: "Online",
    classId: generateClassId(),
  },
];

function generateClassId() {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
}


const TutorSchedule = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthContext();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const [roomId, setRoomId] = useState('')

  useEffect(() => {
    // Simulating data fetching using dummy data
    setSchedules(dummySchedules);
    
    // Commented out API integration
    // fetchData(
    //   `${BASE_URL}/tutor/schedule`,
    //   user.token
    // )
    //   .then((data) => {
    //     setSchedules(data);
    //   })
    //   .catch((err) => console.error(err));
  }, []);

  const handleStartClass = () => {
    navigate(`online-classroom/${selectedClass.classId}`);
  };

  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : (
        <div>
          <div className="heading">
            <h1>My Schedule</h1>
          </div>

          <div className="content">
            <table className="w-full collapse-red border-collapse">
              <thead>
                <tr>
                  <th align="left">Date</th>
                  <th align="center">Student Name</th>
                  <th align="center">Subject</th>
                  <th align="center">Time</th>
                  <th align="center">Location</th>
                  <th align="center">Class ID</th>
                  <th align="center">Start Class</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((item, i) => (
                  <ScheduleItem key={i} item={item} setIsOpen={setIsOpen} setSelectedClass={setSelectedClass} />
                ))}
              </tbody>
            </table>
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
                  Tutor Schedule | Single Session
                </h1>
                <div className="mt-[20px] mb-[40px] flex flex-col gap-[10px]">
                  <span className="flex justify-between border-b border-b-gray-400 pb-[1px] text-[15px]">
                    <p className="font-bold">Student Name:-</p>
                    <p>{selectedClass.studentName}</p>
                  </span>
                  <span className="flex justify-between border-b border-b-gray-400 pb-[1px] text-[15px]">
                    <p className="font-bold">Subject:-</p>
                    <p>{selectedClass.subject}</p>
                  </span>
                  <span className="flex justify-between border-b border-b-gray-400 pb-[1px] text-[15px]">
                    <p className="font-bold">Date:-</p>
                    <p>{selectedClass.date}</p>
                  </span>
                  <span className="flex justify-between border-b border-b-gray-400 pb-[1px] text-[15px]">
                    <p className="font-bold">Time:-</p>
                    <p>{selectedClass.time}</p>
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
        </div>
      )}
    </div>
  );
};

export default TutorSchedule;

const ScheduleItem = ({ item, setIsOpen, setSelectedClass }) => {
  const handleClick = () => {
    setSelectedClass(item); // Set the selected class data
    setIsOpen(true); // Open the modal
  };

  return (
    <tr onClick={handleClick} className="group">
      <td className="group-hover:bg-gray-200 cursor-pointer" align="left">
        <p>{item.date}</p>
      </td>
      <td className="group-hover:bg-gray-200 cursor-pointer" align="center">
        <p>{item.studentName}</p>
      </td>
      <td className="group-hover:bg-gray-200 cursor-pointer" align="center">
        <p>{item.subject}</p>
      </td>
      <td className="group-hover:bg-gray-200 cursor-pointer" align="center">
        <p>{item.time}</p>
      </td>
      <td className="group-hover:bg-gray-200 cursor-pointer" align="center">
        <p>{item.location}</p>
      </td>
      <td className="group-hover:bg-gray-200 cursor-pointer" align="center">
        <p>{item.classId}</p>
      </td>
      <td className="group-hover:bg-gray-200 cursor-pointer" align="center">
        <button className="bg-blue text-white px-[10px] py-[5px] rounded-[5px]">
          Start Class
        </button>
      </td>
    </tr>
  );
};
