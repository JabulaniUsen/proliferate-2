import React, { useState } from "react";
import { MdArrowForwardIos as Arrow } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { subjectsList } from "../../../data/subjects";
import { useAuthContext } from "../../../context/authContext";
import { formatDate } from "../../../utils/formatDate";

const AvailabilityAndExperience = () => {
  const navigate = useNavigate();
  const { tutorFormData, setTutorFormData, handleTutorChange } =
    useAuthContext();

  const [values, setValues] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setTutorFormData({
      ...tutorFormData,
      availableDateTime: values.map((value) => {
        return formatDate(value.unix);
      }),
    });
    navigate("/auth/tutor/register/upload-document");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="auth-page auth-page-2 font-Montserrat shadow-custom">
        <p className="text-[18px] font-Opensans text-center font-medium">
          Please fill out the form below with your preferred subject,
          availability, time zone, and communication language.
          <br className="hidden md:block" />
          This information will help us match you with suitable tutoring
          opportunities.
        </p>

        <div className="form my-[30px] flex flex-col xl:flex-row xl:justify-between gap-[20px]">
          <div className="flex flex-col gap-[20px]">
            <div>
              <label htmlFor="preferredSubjects">
                Preferred Subjects: <span className="text-[red]">*</span>
              </label>
              <Select
                id="preferredSubjects"
                required
                isMulti
                name="preferredSubjects"
                options={subjectsList}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Select your specific subjects"
                value={tutorFormData.preferredSubjects}
                onChange={(selectedOptions) =>
                  setTutorFormData({
                    ...tutorFormData,
                    preferredSubjects: selectedOptions,
                  })
                }
              />
            </div>

            <div>
              <label className="whitespace-nowrap" htmlFor="weeklyAvailability">
                Weekly Availability: <span className="text-[red]">*</span>
              </label>
              <Select
                id="weeklyAvailability"
                required
                isMulti
                name="weeklyAvailability"
                options={weeklyavailabilityList}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Select assessment approach"
                value={tutorFormData.weeklyAvailability}
                onChange={(selectedOptions) =>
                  setTutorFormData({
                    ...tutorFormData,
                    weeklyAvailability: selectedOptions,
                  })
                }
              />
            </div>

            <div>
              <label htmlFor="timeslotAvailability">
                Timeslot Availability: <span className="text-[red]">*</span>
              </label>
              <Select
                id="timeslotAvailability"
                required
                isMulti
                name="timeslotAvailability"
                options={availabilityList}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Please select at least two time slots"
                value={tutorFormData.timeslotAvailability}
                onChange={(selectedOptions) =>
                  setTutorFormData({
                    ...tutorFormData,
                    timeslotAvailability: selectedOptions,
                  })
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-[20px]">
            <div className="">
              <label htmlFor="selectTimezone">
                Select your timezone: <span className="text-[red]">*</span>
              </label>
              <select
                name="selectTimezone"
                value={tutorFormData.selectTimezone}
                onChange={handleTutorChange}
                id="selectTimezone"
                required
              >
                <option value="">Select your timezone</option>
                <option value="UTC-12:00">UTC-12:00 (Baker Island)</option>
                <option value="UTC-11:00">UTC-11:00 (Niue)</option>
                <option value="UTC-10:00">UTC-10:00 (Hawaii-Aleutian)</option>
                <option value="UTC-09:00">UTC-09:00 (Alaska)</option>
                <option value="UTC-08:00">UTC-08:00 (Pacific Time)</option>
                <option value="UTC-07:00">UTC-07:00 (Mountain Time)</option>
                <option value="UTC-06:00">UTC-06:00 (Central Time)</option>
                <option value="UTC-05:00">UTC-05:00 (Eastern Time)</option>
                <option value="UTC-04:00">UTC-04:00 (Atlantic Time)</option>
                <option value="UTC-03:00">UTC-03:00 (Argentina)</option>
                <option value="UTC-02:00">UTC-02:00 (South Georgia)</option>
                <option value="UTC-01:00">UTC-01:00 (Azores)</option>
                <option value="UTC+00:00">
                  UTC+00:00 (Greenwich Mean Time)
                </option>
                <option value="UTC+01:00">
                  UTC+01:00 (Central European Time)
                </option>
                <option value="UTC+02:00">
                  UTC+02:00 (Eastern European Time)
                </option>
                <option value="UTC+03:00">UTC+03:00 (Moscow Time)</option>
                <option value="UTC+04:00">
                  UTC+04:00 (Gulf Standard Time)
                </option>
                <option value="UTC+05:00">
                  UTC+05:00 (Pakistan Standard Time)
                </option>
                <option value="UTC+06:00">UTC+06:00 (Bangladesh Time)</option>
                <option value="UTC+07:00">UTC+07:00 (Indochina Time)</option>
                <option value="UTC+08:00">
                  UTC+08:00 (China Standard Time)
                </option>
                <option value="UTC+09:00">
                  UTC+09:00 (Japan Standard Time)
                </option>
                <option value="UTC+10:00">
                  UTC+10:00 (Australian Eastern Time)
                </option>
                <option value="UTC+11:00">UTC+11:00 (Solomon Islands)</option>
                <option value="UTC+12:00">UTC+12:00 (Fiji)</option>
              </select>
            </div>

            <div>
              <label htmlFor="communicationLanguage">
                Communication Language: <span className="text-[red]">*</span>
              </label>
              <select
                className="bg-white"
                required
                name="communicationLanguage"
                value={tutorFormData.communicationLanguage}
                onChange={handleTutorChange}
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
      </div>

      <div className="auth-footer">
        <Link to="/auth/tutor/register/teaching-style-and-approach">
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

export default AvailabilityAndExperience;

const weeklyavailabilityList = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

const availabilityList = [
  { value: "morning", label: "Morning (8 AM - 12 PM)" },
  { value: "afternoon", label: "Afternoon (12 PM - 4 PM)" },
  { value: "evening", label: "Evening (4 PM - 8 PM)" },
  { value: "night", label: "Night (8 PM - 12 AM)" },
];
