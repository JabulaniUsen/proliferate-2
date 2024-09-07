import React from "react";
import { MdArrowForwardIos as Arrow } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useAuthContext } from "../../../context/authContext";

const Preferences = () => {
  const navigate = useNavigate();
  const { formData, setFormData, handleChange } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/auth/student/register/learning-goals");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="auth-page auth-page-2 font-Montserrat shadow-custom">
        <p className="text-[18px] font-Opensans text-center font-medium">
          Choose whether you prefer online or in-person tutoring and specify
          your availability for sessions.
          <br className="hidden md:block" /> You can also mention any additional
          preferences or requirements you have for the tutoring sessions.
        </p>

        <div className="form my-[30px] flex flex-col items-center">
          <div>
            <label htmlFor="availability">
              Availability: <span className="text-[red]">*</span>
            </label>
            <Select
              id="availability"
              isMulti
              required
              name="availability"
              options={availabilityOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              value={formData.availability}
              onChange={(selectedOptions) =>
                setFormData({
                  ...formData,
                  availability: selectedOptions,
                })
              }
              placeholder="Select Availability"
            />
          </div>

          <div className="my-[20px]">
            <label htmlFor="additionalPreferences">
              Additional Preferences/Requirements:
            </label>
            <textarea
              className="resize-none"
              name="additionalPreferences"
              value={formData.additionalPreferences}
              onChange={handleChange}
              id="additionalPreferences"
              maxLength={100}
            ></textarea>
          </div>

          <div>
            <label htmlFor="communicationLanguage">
              Communication Language: <span className="text-[red]">*</span>
            </label>
            <select
              className="bg-white"
              required
              name="communicationLanguage"
              value={formData.communicationLanguage}
              onChange={handleChange}
              id="communicationLanguage"
            >
              <option value="">Enter your preferred language</option>
              <option value="english">English</option>
              <option value="french">French</option>
              <option value="spanish">Spanish</option>
            </select>
          </div>
        </div>
      </div>

      <div className="auth-footer">
        <Link to="/auth/student/register/academic-details">
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

export default Preferences;

const availabilityOptions = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

const attendanceOptions = [
  { value: "online", label: "Online" },
  { value: "in-person", label: "In person" },
  { value: "hybrid", label: "Hybrid" },
];
