import React from "react";
import { MdArrowForwardIos as Arrow } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/authContext";

const LearningGoals = () => {
  const { formData, handleChange } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/auth/student/register/terms-and-conditions");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="auth-page auth-page-2 font-Montserrat shadow-custom">
        <p className="text-[18px] font-Opensans text-center font-medium">
          Describe any challenges and short-term goals you want to achieve.
          Outline your long-term goals. <br className="hidden md:block" />
          This information will help us tailor the tutoring experience to meet
          your needs.
        </p>

        <div className="form my-[30px] flex flex-col items-center">
          <div>
            <label htmlFor="shortTermGoals">Short-term Goals:</label>
            <textarea
              className="resize-none"
              name="shortTermGoals"
              id="shortTermGoals"
              value={formData.shortTermGoals}
              onChange={handleChange}
              placeholder="Enter your short term goal"
              maxLength={100}
            ></textarea>
          </div>

          <div className="mt-[20px]">
            <label htmlFor="longTermGoals">Long-term Goals:</label>
            <textarea
              className="resize-none"
              name="longTermGoals"
              id="longTermGoals"
              value={formData.longTermGoals}
              onChange={handleChange}
              placeholder="Enter your long term goal"
              maxLength={100}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="auth-footer">
        <Link to="/auth/student/register/preferences">
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

export default LearningGoals;
