import axios from "axios";
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useAuthContext } from "../../context/authContext";
import { useGlobalContext } from "../../context/globalContext";
import { useUser } from "../../context/userContext";
import { subjectsList } from "../../data/subjects";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";

const TutorAddAssignment = () => {
  const { user } = useAuthContext();
  const { setIsLoaderOpen } = useGlobalContext();
  const { students } = useUser();

  const [assignedStudentId, setAssignedStudentId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoaderOpen(true);
    try {
      const formData = new FormData();
      formData.append("assignedStudentId", assignedStudentId);
      formData.append("dueDate", dueDate);
      formData.append("title", title);
      formData.append("gradeLevel", gradeLevel);
      formData.append("assignmentFile", assignmentFile);
      formData.append("subjectId", subjectId);
      formData.append("description", description);

      const response = await axios.post(
        `${BASE_URL}/tutor/create-assignment`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast("Assignment Sent");
      setIsLoaderOpen(false);
    } catch (error) {
      console.error(error.message);
      setIsLoaderOpen(false);
    }
  };

  const handleFileChange = (e) => {
    setAssignmentFile(e.target.files[0]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (e) => {
    const formattedDate = formatDate(e.target.value);
    console.log(formattedDate);
    setDueDate(formattedDate);
  };

  return (
    <div className="add-assignment">
      <div className="heading">
        <h1>Assignment | Add</h1>
      </div>

      <div className="content">
        <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
          <div>
            <p>Select Student:</p>
            <select
              value={assignedStudentId}
              onChange={(e) => {
                console.log(e.target.value.toString());
                setAssignedStudentId(e.target.value.toString());
              }}
              name="assignedStudentId"
              id="assignedStudentId"
              required
            >
              <option value="">Select</option>
              {students.map((student) => (
                <option key={student.studentId} value={student.studentId}>
                  {student.fullName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p>Due Date:</p>
            <input
              type="date"
              value={dueDate}
              onChange={handleDateChange}
              name="dueDate"
              id="dueDate"
              required
            />
          </div>

          <div>
            <p>Assignment Title:</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              id="title"
              required
            />
          </div>

          <div>
            <p>Description:</p>
            <textarea
              className="h-[100px] resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="desc"
              id="desc"
              required
            ></textarea>
          </div>

          <div>
            <p>Subject:</p>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              name="subjectId"
              id="subjectId"
              required
            >
              <option value="">Select</option>

              {subjectsList.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p>Grade Level:</p>
            <select
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              name="gradeLevel"
              id="gradeLevel"
              required
            >
              <option value="">Select</option>
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
            <p>Upload Document:</p>
            <div className="flex flex-col items-center justify-center gap-[20px]">
              {assignmentFile ? (
                <div className="w-[350px] h-[100px] bg-gray-100 rounded-[4px] grid place-items-center">
                  <p className="font-medium text-[14px]">
                    {assignmentFile.name}
                  </p>
                </div>
              ) : (
                <div className="w-[350px] h-[100px] bg-gray-100 rounded-[4px] flex flex-col justify-center items-center gap-[2px]">
                  <FaCloudUploadAlt className="text-[40px] text-gray-300" />
                  <label className="underline text-blue text-[20px] font-semibold cursor-pointer">
                    Browse Files
                    <input
                      type="file"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      required
                    />
                  </label>
                </div>
              )}

              <button
                type="submit"
                className="w-fit bg-blue text-white font-medium rounded-[10px] px-[30px] py-[10px]"
              >
                Send Assignment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TutorAddAssignment;
