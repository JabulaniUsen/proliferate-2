import React, { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { useAuthContext } from "../../context/authContext";
import { fetchData } from "../../utils/fetchData";
import { useUser } from "../../context/userContext";

const TutorStudents = () => {
  const { user } = useAuthContext();
  const { students, getStudents } = useUser();

  const [isOpen, setIsOpen] = useState(false);
  const [student, setStudent] = useState({});

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div>
      <div className="heading">
        <h1>View Students</h1>
      </div>

      <div className="content">
        {students.length > 0 && (
          <table className="w-full collapse-red border-collapse">
            <thead>
              <tr>
                <th align="center">Student ID</th>
                <th align="center">Student Name</th>
                <th align="center">Subject</th>
                <th align="center">Grade Level</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, i) => (
                <StudentItem
                  key={i}
                  student={student}
                  setIsOpen={setIsOpen}
                  students={students}
                  setStudent={setStudent}
                />
              ))}
            </tbody>
          </table>
        )}
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
              <span className="w-full border-b border-b-gray-400 pb-[1px] text-[15px]">
                <p className="font-bold">Name:</p>
                <p>{student?.fullName}</p>
              </span>
              <span className="w-full border-b border-b-gray-400 pb-[1px] text-[15px]">
                <p className="font-bold">Age:</p>
                <p>{student?.age}</p>
              </span>
              <span className="w-full border-b border-b-gray-400 pb-[1px] text-[15px]">
                <p className="font-bold">Grade/Level:</p>
                <p>
                  {student?.gradeYear &&
                  gradeOptions.find(
                    (grade) => grade.value === student?.gradeYear
                  )
                    ? gradeOptions.find(
                        (grade) => grade.value === student?.gradeYear
                      ).label
                    : student?.gradeYear}
                </p>
              </span>
              <span className="w-full border-b border-b-gray-400 pb-[1px] text-[15px]">
                <p className="font-bold">Preferred Tutoring Format:</p>
                <p>Online</p>
              </span>
              <span className="w-full border-b border-b-gray-400 pb-[1px] text-[15px]">
                <p className="font-bold">Availability:</p>
                <p className="capitalize">{student?.availability}</p>
              </span>
              <span className="w-full border-b border-b-gray-400 pb-[1px] text-[15px]">
                <p className="font-bold w-fit">
                  Additional Preferences/Requirements:
                </p>
                <p className="inline-block">
                  {student?.additionalPreferencesRequirements}
                </p>
              </span>
              <span className="w-full border-b border-b-gray-400 pb-[1px] text-[15px]">
                <p className="font-bold">Short-term Goals:</p>
                <p>{student?.shortTermGoals}</p>
              </span>
              <span className="w-full border-b border-b-gray-400 pb-[1px] text-[15px]">
                <p className="font-bold">Long-term Goals:</p>
                <p>{student?.longTermGoals}</p>
              </span>
            </div>
            <div className="flex justify-center gap-[20px] items-center">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-blue text-white font-medium px-[20px] py-[5px] rounded-[8px]"
              >
                Start
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="border border-blue text-blue font-medium px-[20px] py-[5px] rounded-[8px]"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorStudents;

const StudentItem = ({ setIsOpen, student, students, setStudent }) => {
  return (
    <tr className="group">
      <td align="center">
        <p>{student.studentId}</p>
      </td>
      <td align="center">
        <p>{student.fullName}</p>
      </td>
      <td align="center">
        <p>Mathematics</p>
      </td>
      <td align="center">
        <div className="flex justify-center items-center gap-[20px]">
          <p>
            {student?.gradeYear &&
            gradeOptions.find((grade) => grade.value === student?.gradeYear)
              ? gradeOptions.find((grade) => grade.value === student?.gradeYear)
                  .label
              : student?.gradeYear}
          </p>
          <button
            onClick={() => {
              setIsOpen(true);
              setStudent(
                students.find((stu) => stu.studentId === student.studentId)
              );
            }}
            className="underline text-blue"
          >
            View
          </button>
          <button className="size-[30px] rounded-[6px] bg-blue text-white grid place-items-center">
            <FiSend />
          </button>
        </div>
      </td>
    </tr>
  );
};

const gradeOptions = [
  { value: "kindergarten", label: "Kindergarten" },
  { value: "grade1", label: "Grade 1" },
  { value: "grade2", label: "Grade 2" },
  { value: "grade3", label: "Grade 3" },
  { value: "grade4", label: "Grade 4" },
  { value: "grade5", label: "Grade 5" },
  { value: "grade6", label: "Grade 6" },
  { value: "grade7", label: "Grade 7" },
  { value: "grade8", label: "Grade 8" },
  { value: "grade9", label: "Grade 9" },
  { value: "grade10", label: "Grade 10" },
  { value: "grade11", label: "Grade 11" },
  { value: "grade12", label: "Grade 12" },
  { value: "adult-learner", label: "Adult Learner" },
];
