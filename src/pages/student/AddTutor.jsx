import React, { useState } from "react";
import { subjectsList } from "../../data/subjects";
import { toast } from "react-toastify";
import { useUser } from "../../context/userContext";
import TutorList from "./TutorList";
import axios from "axios";
import { useAuthContext } from "../../context/authContext";
import img from "../../assets/notutor.png";
import { BASE_URL } from "../../config";

const AddTutor = () => {
  const { user } = useAuthContext();
  const { paymentDetails, setPaymentDetails } = useUser();

  const [loading, setLoading] = useState(false);
  const [tutors, setTutors] = useState([]);
  const [emptyList, setEmptyList] = useState(false);
  const [subject, setSubject] = useState("");
  const [subject2, setSubject2] = useState("");

  const getTutors = (subject) => {
    setEmptyList(false);
    setLoading(true);

    const id = subjectsList.find((item) => item.value === subject).id;
    console.log(user.token);
    axios
  .get(`${BASE_URL}/student/get-all-tutors/${id}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  })
  .then((res) => {
    setTutors(res.data);
    setLoading(false);
  })
  .catch((err) => {
    console.log(err); // Log the error to see if there's more information
    setLoading(false);
    // You might want to handle the error more gracefully here
  });

  };

  const handleNext = () => {
    if (paymentDetails.subject == "") {
      toast.error("Select a subject");
    } else {
      setPaymentDetails({ subject });
      getTutors(subject);
    }
  };

  return (
    <div>
      <div className="heading">
        <h1>Find Tutor</h1>
      </div>

      <div className="content font-Montserrat">
        <div className="flex flex-wrap items-center gap-[20px]">
          <p className="text-[24px] font-bold">Choose a new Subject/Tutor:</p>

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="flex-1 rounded-[8px] px-[6px] py-[10px] border border-[#CCCCCC]"
          >
            <option value="">Select Subject</option>
            {subjectsList.map((subject, i) => (
              <option key={i} value={subject.value}>
                {subject.label}
              </option>
            ))}
          </select>

          <button
            onClick={handleNext}
            className="bg-blue text-white font-semibold rounded-[8px] px-[25px] py-[10px]"
          >
            Check Availability
          </button>
        </div>

        <div className="mt-[50px]">
          {!emptyList > 0 ? (
            <TutorList loading={loading} tutors={tutors} />
          ) : (
            <div className="flex flex-col gap-[10px] items-center">
              <img className="w-[50%]" src={img} alt="no tutor available" />
              <p className="text-[16px] font-medium">
                <span className="capitalize">{subject2}</span> tutors are
                currently not available
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTutor;
