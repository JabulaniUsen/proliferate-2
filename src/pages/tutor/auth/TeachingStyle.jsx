import React from "react";
import { MdArrowForwardIos as Arrow } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/authContext";

const TeachingStyle = () => {
  const navigate = useNavigate();
  const { tutorFormData, handleTutorChange } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/auth/tutor/register/availability-and-preference");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="auth-page auth-page-2 font-Montserrat shadow-custom">
        <p className="text-[18px] font-Opensans text-center font-medium">
          Choose whether you prefer online or in-person tutoring and specify
          your availability for sessions.
          <br className="hidden md:block" />
          You can also mention any additional preferences or requirements you
          have for the tutoring sessions.
        </p>

        <div className="form my-[30px] flex flex-col items-center gap-[20px]">
          <div>
            <label htmlFor="teachingStyle">
              Teaching Style: <span className="text-[red]">*</span>
            </label>
            <select
              id="teachingStyle"
              name="teachingStyle"
              value={tutorFormData.teachingStyle}
              onChange={handleTutorChange}
              required
            >
              <option value="">Select Teaching Style</option>
              <option value="Interactive">Interactive</option>
              <option value="Lecture-based">Lecture-based</option>
              <option value="Hands-on">Hands-on</option>
              <option value="Customized">Customized</option>
            </select>
          </div>

          <div>
            <label htmlFor="approachToTutoring">
              Approach to Tutoring: <span className="text-[red]">*</span>
            </label>
            <textarea
              className="resize-none"
              required
              value={tutorFormData.approachToTutoring}
              onChange={handleTutorChange}
              name="approachToTutoring"
              id="approachToTutoring"
              maxLength="190"
              placeholder="Describe your approach to tutoring and how you engage with students"
            ></textarea>
          </div>

          <div>
            <label htmlFor="attendanceType">
              Attendance Type: <span className="text-[red]">*</span>
            </label>
            <select
              id="attendanceType"
              name="attendanceType"
              value={tutorFormData.attendanceType}
              onChange={handleTutorChange}
              required
            >
              <option value="">Select Attendance Type</option>
              <option value="onsite">Onsite</option>
              <option value="hybrid">Hybrid</option>
              <option value="online">Online</option>
            </select>
          </div>
        </div>
      </div>

      <div className="auth-footer">
        <Link to="/auth/tutor/register/education-and-experience">
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

export default TeachingStyle;
