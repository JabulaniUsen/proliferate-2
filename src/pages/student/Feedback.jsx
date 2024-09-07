import axios from "axios";
import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useAuthContext } from "../../context/authContext";
import { useGlobalContext } from "../../context/globalContext";
import { subjectsList } from "../../data/subjects";
import { useUser } from "../../context/userContext";
import { BASE_URL } from "../../config";

const Feedback = () => {
  const { user } = useAuthContext();
  const { setIsLoaderOpen, setModalErr } = useGlobalContext();
  const { tutors } = useUser();

  const [formData, setFormData] = useState({
    tutorId: "",
    subjectId: "",
    sessionDate: "",
    rating: 0,
    comments: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoaderOpen(true);
    axios
      .post(
        `${BASE_URL}/student/create-feedback`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setIsLoaderOpen(false);
        setModalErr({
          title: "Feedback Sent",
          body: "Thanks for providing a feedback",
        });
        setFormData({
          tutorId: "",
          subjectId: "",
          sessionDate: "",
          rating: 0,
          comments: "",
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoaderOpen(false);
      });
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="feedback">
      <div className="heading">
        <h1>Feedback</h1>
      </div>

      <div className="content">
        <p className="w-[90%] text-[14px] font-Opensans font-medium">
          We value your feedback! It helps us understand your needs better so
          that we can improve our tutoring services and provide you with the
          best possible learning experience. Please take a moment to share your
          thoughts with us. Once you've provided your feedback, click on the
          "Submit Feedback" button to send your responses to our team. Thank you
          for taking the time to share your thoughts with us!
        </p>

        <h3 className="my-[30px] text-[24px] font-bold font-Montserrat">
          Tutor Feedback
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
          <div>
            <p>Tutor Name:</p>
            <select
              name="tutorId"
              value={formData.tutorId}
              onChange={handleChange}
              required
            >
              <option value="">Select Tutor</option>
              {Array.isArray(tutors) &&
                tutors.map((tutor, i) => (
                  <option key={i} value={tutor.tutorId}>
                    {tutor.fullName}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <p>Subject:</p>

            <select
              name="subjectId"
              value={formData.subjectId}
              onChange={handleChange}
              required
            >
              <option value="">Select Subject</option>
              {subjectsList.map((item, i) => (
                <option key={i} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p>Session Date:</p>
            <input
              name="sessionDate"
              value={formData.sessionDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sessionDate: formatDate(e.target.value),
                })
              }
              required
              type="date"
            />
          </div>
          <div>
            <p>Your Rating:</p>
            <span className="flex items-center gap-[5px]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  selected={i < formData.rating}
                  onClick={() => setFormData({ ...formData, rating: i + 1 })}
                />
              ))}
            </span>
          </div>

          <div style={{ alignItems: "start" }}>
            <p>Comments:</p>
            <textarea
              className="resize-none h-[200px]"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button className="mt-[30px] mx-auto w-fit p-[10px] rounded-[10px] bg-blue text-white font-Poppins font-[500]">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;

const Star = ({ selected = false, onClick }) => (
  <span onClick={onClick} style={{ cursor: "pointer", color: "#DE4B18" }}>
    {selected ? <FaStar /> : <FaRegStar />}
  </span>
);

const subjects = [
  { value: "mathematics", label: "Mathematics" },
  { value: "english-language-arts-ela", label: "English Language Arts (ELA)" },
  { value: "science", label: "Science" },
  { value: "social-studies", label: "Social Studies" },
  { value: "history", label: "History" },
  { value: "geography", label: "Geography" },
  { value: "physical-education-pe", label: "Physical Education (PE)" },
  { value: "art", label: "Art" },
  { value: "music", label: "Music" },
  {
    value: "foreign-languages-e-g-spanish-french",
    label: "Foreign Languages (e.g., Spanish, French)",
  },
  { value: "computer-science", label: "Computer Science" },
  { value: "health-education", label: "Health Education" },
  { value: "civics", label: "Civics" },
  { value: "economics", label: "Economics" },
  { value: "literature", label: "Literature" },
  { value: "environmental-studies", label: "Environmental Studies" },
  { value: "technology-education", label: "Technology Education" },
  {
    value: "religious-studies-depending-on-the-curriculum",
    label: "Religious Studies (depending on the curriculum)",
  },
  { value: "drama", label: "Drama" },
  {
    value: "career-and-technical-education-cte",
    label: "Career and Technical Education (CTE)",
  },
];
