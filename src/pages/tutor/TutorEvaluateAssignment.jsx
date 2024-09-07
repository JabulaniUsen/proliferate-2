import React, { useEffect, useState } from "react";
import { RiAttachment2 } from "react-icons/ri";
import { FiSend } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { useAuthContext } from "../../context/authContext";
import { fetchData } from "../../utils/fetchData";
import LoadingPage from "../../components/LoadingPage";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../config";


const TutorEvaluateAssignment = () => {
  const { user } = useAuthContext();

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchData(
      `${BASE_URL}/tutor/all-assignments`,
      user.token
    )
      .then((data) => {
        setAssignments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const deleteAssignment = async (id) => {
    setAssignments(assignments.filter((item) => item.assignmentId != id));
    toast("Deleted");

    const url = `https://formal-saloma-proliferate-41ba3b45.koyeb.app/api/v1/tutor/assignment/delete/${id}`;

    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Deleted from backend");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : (
        <div>
          <div className="heading">
            <h1>Assignment | Evaluate</h1>
          </div>
          <div className="content">
            <table className="w-full collapse-red border-collapse">
              <thead>
                <tr>
                  <th align="center"></th>
                  <th align="center">Assigned Student</th>
                  <th align="center">Due Date</th>
                  <th align="center">Title</th>
                  <th align="center">Attachment</th>
                  <th align="center">Send Message</th>
                </tr>
              </thead>
              <tbody>
                {assignments &&
                  assignments.map((item, i) => (
                    <AssignmentItem
                      key={i}
                      i={i}
                      item={item}
                      deleteAssignment={deleteAssignment}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorEvaluateAssignment;

const AssignmentItem = ({ item, i, deleteAssignment }) => {
  const handleDownload = (
    fileName = item.title + ".pdf",
    base64String = item.assignmentFileBase64
  ) => {
    try {
      if (!base64String) {
        console.error("Base64 string is empty or invalid");
        return;
      }

      // Decode the base64 string
      const byteCharacters = atob(base64String);

      // Convert to byte arrays
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      // Create a Blob from the byte array
      const blob = new Blob([byteArray], { type: "application/octet-stream" });

      // Create a link element
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;

      // Append the link to the body
      document.body.appendChild(link);

      // Programmatically click the link
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);

      toast("Download completed");
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  return (
    <tr className="group">
      <td align="center">
        <div className="">
          <p>{i + 1}</p>
          {/* <input type="checkbox" /> */}
        </div>
      </td>
      <td align="center">
        <p>{item.assignedStudentName}</p>
      </td>
      <td align="center">
        <p>{item.dueDate}</p>
      </td>
      <td align="center">
        <p>{item.title}</p>
      </td>
      <td align="center">
        <div
          onClick={() => handleDownload()}
          className="flex items-center cursor-pointer gap-[5px] justify-center"
        >
          <p>1</p>
          <RiAttachment2 className="text-blue" />
        </div>
      </td>
      <td align="center">
        <div className="flex justify-center">
          <button className="size-[30px] rounded-[6px] bg-blue text-white grid place-items-center">
            <FiSend />
          </button>
        </div>
      </td>
      <td align="center">
        <div
          onClick={() => deleteAssignment(item.assignmentId)}
          className="size-[20px] bg-[red] rounded-full grid place-items-center"
        >
          <FaTimes className="text-white" />
        </div>
      </td>
    </tr>
  );
};
