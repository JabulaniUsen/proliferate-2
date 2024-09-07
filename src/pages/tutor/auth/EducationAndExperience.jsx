import React from "react";
import { MdArrowForwardIos as Arrow } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/authContext";

const EducationAndExperience = () => {
  const navigate = useNavigate();
  const { tutorFormData, handleTutorChange } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/auth/tutor/register/teaching-style-and-approach");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="auth-page auth-page-2 font-Montserrat shadow-custom">
        <p className="text-[18px] font-Opensans text-center font-medium">
          Please enter the name of your school, college, or university.
          <br className="hidden md:block" />
          Select the subjects you will be tutoring and enter the grade(s) you
          currently teach.
        </p>

        <div className="form my-[30px] flex flex-wrap xl:grid grid-cols-2 xl:justify-between gap-y-[30px] gap-[20px]">
          <div>
            <label htmlFor="highestEducationLevelAttained">
              Highest Education Level Attained:{" "}
              <span className="text-[red]">*</span>
            </label>
            <select
              id="highestEducationLevelAttained"
              name="highestEducationLevelAttained"
              required
              value={tutorFormData.highestEducationLevelAttained}
              onChange={handleTutorChange}
            >
              <option value="">Select Education Level</option>
              <option value="High School Diploma">High School Diploma</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="Ph.D.">Ph.D.</option>
            </select>
          </div>

          <div>
            <label htmlFor="majorFieldOfStudy">
              Major/Field of Study: <span className="text-[red]">*</span>
            </label>
            <input
              type="text"
              value={tutorFormData.majorFieldOfStudy}
              onChange={handleTutorChange}
              required
              id="majorFieldOfStudy"
              name="majorFieldOfStudy"
              placeholder="Enter your field of study"
            />
          </div>

          <div>
            <label htmlFor="yearsOfExperience">
              Years of Teaching Experience:{" "}
              <span className="text-[red]">*</span>
            </label>
            <select
              id="yearsOfExperience"
              value={tutorFormData.yearsOfExperience}
              onChange={handleTutorChange}
              name="yearsOfExperience"
              required
            >
              <option value="">How many years of experience</option>
              <option value="1">1 year</option>
              <option value="2">2 years</option>
              <option value="3">3 years</option>
              <option value="4">4 years</option>
              <option value="5">5 years</option>
              <option value="6">6 years</option>
              <option value="7">7 years</option>
              <option value="8">8 years</option>
              <option value="9">9 years</option>
              <option value="10">10+ years</option>
            </select>
          </div>

          <div>
            <label htmlFor="teachingGrade">
              Teaching Grade: <span className="text-[red]">*</span>
            </label>
            <select
              className="bg-white"
              value={tutorFormData.teachingGrade}
              onChange={handleTutorChange}
              id="teachingGrade"
              name="teachingGrade"
              required
            >
              <option value="">Enter your current grade</option>
              <option value="KG">Kindergarten</option>
              <option value="1">Grade 1</option>
              <option value="2">Grade 2</option>
              <option value="3">Grade 3</option>
              <option value="4">Grade 4</option>
              <option value="5">Grade 5</option>
              <option value="6">Grade 6</option>
              <option value="7">Grade 7</option>
              <option value="8">Grade 8</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
              <option value="AL">Adult Learner</option>
            </select>
          </div>

          <div>
            <label htmlFor="currentSchool">
              Current School: <span className="text-[red]">*</span>
            </label>
            <input
              type="text"
              required
              id="currentSchool"
              name="currentSchool"
              placeholder="Name of School you currently teach in"
              value={tutorFormData.currentSchool}
              onChange={handleTutorChange}
            />
          </div>

          <div>
            <label htmlFor="location">
              Location: <span className="text-[red]">*</span>
            </label>
            <input
              required
              type="text"
              id="location"
              name="location"
              placeholder="Select your current location"
              value={tutorFormData.location}
              onChange={handleTutorChange}
            />
          </div>
        </div>
      </div>

      <div className="auth-footer">
        <Link to="/auth/tutor/register">
          <p>Back</p>
        </Link>

        <button type="submit">
          <p>Next</p>
          <Arrow />
        </button>
      </div>
    </form>
  );
};

export default EducationAndExperience;
