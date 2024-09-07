import React from "react";
import { subjectsList } from "../../data/subjects";
import Select from "react-select";

const TutorGradeAndSubjects = () => {
  return (
    <div className="py-[10px]">
      <p className="font-Opensans">
        Please provide any additional information about your grade and subject
        preferences, such as specific topics or areas of expertise. This will
        help us match you with suitable students and assignments.
      </p>

      <div className="my-[30px] w-[50%] flex flex-col gap-[20px]">
        <div>
          <label className="font-medium" htmlFor="grade">
            Grade Level
          </label>
          <select
            className="bg-white w-full border border-[#CCCCCC] px-[10px] py-[5px] rounded-[8px]"
            id="grade"
            name="grade"
          >
            <option value="">Enter your current grade</option>
            <option value="kindergarten">Kindergarten</option>
            <option value="grade1">Grade 1</option>
            <option value="grade2">Grade 2</option>
            <option value="grade3">Grade 3</option>
            <option value="grade4">Grade 4</option>
            <option value="grade5">Grade 5</option>
            <option value="grade6">Grade 6</option>
            <option value="grade7">Grade 7</option>
            <option value="grade8">Grade 8</option>
            <option value="grade9">Grade 9</option>
            <option value="grade10">Grade 10</option>
            <option value="grade11">Grade 11</option>
            <option value="grade12">Grade 12</option>
            <option value="adult-learner">Adult Learner</option>
          </select>
        </div>

        <div>
          <label className="font-medium" htmlFor="subjects">
            Subjects
          </label>
          <Select
            id="subjects"
            isMulti
            name="subjects"
            options={subjectsList}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select your specific subjects"
          />
        </div>
      </div>

      <button className="block mx-auto bg-blue rounded-[6px] px-[40px] py-[4px] font-medium text-white">
        Save
      </button>
    </div>
  );
};

export default TutorGradeAndSubjects;
