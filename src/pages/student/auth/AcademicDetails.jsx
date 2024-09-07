import { MdArrowForwardIos as Arrow } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useAuthContext } from "../../../context/authContext";
import { subjectsList } from "../../../data/subjects";

const AcademicDetails = () => {
  const navigate = useNavigate();
  const { formData, setFormData, handleChange } = useAuthContext();

  const checkFormData = (form) => {
    const isAnyFieldEmpty = Object.values(form).some(
      (value) => !value || (Array.isArray(value) && value.length === 0)
    );
    return isAnyFieldEmpty;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = {
      gradeYear: formData.gradeYear,
      attendanceType: formData.attendanceType,
      currentLocation: formData.currentLocation,
      subjectsNeedingTutoring: formData.subjectsNeedingTutoring
        .map((option) => option.value)
        .join(","),
    };

    const isAnyFieldEmpty = checkFormData({ ...newForm });
    if (isAnyFieldEmpty) {
      toast.error("Enter appropriate values");
      return;
    }

    navigate("/auth/student/register/preferences");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="auth-page auth-page-2 font-Montserrat shadow-custom">
        <p className="text-[18px] font-Opensans text-center font-medium">
          Please enter your grade level, current location, attendance type and
          the subjects for which you need tutoring.
        </p>

        <div className="form my-[30px] flex flex-col lg:grid grid-cols-2 justify-between gap-[20px]">
          <div>
            <label htmlFor="gradeYear">
              Grade level: <span className="text-[red]">*</span>
            </label>
            <select
              className="bg-white"
              value={formData.gradeYear}
              onChange={handleChange}
              name="gradeYear"
              id="gradeYear"
              required
            >
              <option value="">Enter your Grade</option>
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
            <label htmlFor="currentLocation">
              Current Location: <span className="text-[red]">*</span>
            </label>
            <input
              type="text"
              value={formData.currentLocation}
              onChange={handleChange}
              id="currentLocation"
              required
              name="currentLocation"
              placeholder="Enter your current location, country, state "
            />
          </div>

          <div>
            <label htmlFor="subjects">
              Subjects for Tutoring: <span className="text-[red]">*</span>
            </label>
            <Select
              id="subjects"
              required
              isMulti
              name="subjects"
              options={subjectsList}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select Subjects"
              value={formData.subjectsNeedingTutoring}
              onChange={(selectedOptions) =>
                setFormData({
                  ...formData,
                  subjectsNeedingTutoring: selectedOptions,
                })
              }
            />
          </div>

          <div>
            <label htmlFor="attendanceType">
              Attendance Type: <span className="text-[red]">*</span>
            </label>
            <select
              className="bg-white"
              value={formData.attendanceType}
              onChange={handleChange}
              name="attendanceType"
              id="attendanceType"
              required
            >
              <option value="">select attendance type</option>
              <option value="online">Online</option>
              <option value="hybrid">Hybrid</option>
              <option value="in-person">In person</option>
            </select>
          </div>

          <div>
            <label htmlFor="preferredTime">
              Preferred Time: <span className="text-[red]">*</span>
            </label>
            <select
              className="bg-white"
              value={formData.preferredTime}
              onChange={handleChange}
              name="preferredTime"
              id="preferredTime"
              required
            >
              <option value="">select preferred time</option>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
      </div>

      <div className="auth-footer">
        <Link to="/auth/student/register" className="">
          <p>Back</p>
        </Link>

        <button type="submit" className="">
          <p>Next</p>
          <Arrow />
        </button>
      </div>
    </form>
  );
};

export default AcademicDetails;

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
