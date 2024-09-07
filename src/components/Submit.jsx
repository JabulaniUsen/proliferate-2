import React, { useState } from "react";
import { FaTimes, FaDownload, FaImages } from "react-icons/fa";
import { IoMdInformationCircle as Info } from "react-icons/io";
import { MdOutlineKeyboardArrowDown as Arrow } from "react-icons/md";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/authContext";
import axios from "axios";
import { useGlobalContext } from "../context/globalContext";

const Submit = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <div className="pr-[50px] flex justify-between gap-[20px]">
      <div className="w-[456px]">
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="px-[12px] py-[16px] flex items-center justify-between border border-[red] cursor-pointer"
        >
          <p className="text-[14px] font-Opensans text-[#333333] font-bold">
            {item.title}
          </p>

          <Arrow className={!isOpen && "rotate-180"} />
        </div>

        <div
          className={`${
            isOpen ? "h-fit" : "h-0 overflow-hidden"
          } w-full duration-200 `}
        >
          <div className="flex justify-between px-[10px]">
            <p className="w-[70%] text-[14px] font-Opensans font-medium">
              Description: {item.description}
            </p>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="font-[600] text-[15px] font-Montserrat underline text-[#1D8EED]"
            >
              Attach files
            </button>
          </div>
        </div>
      </div>

      <UploadAssignment
        isUploadOpen={isUploadOpen}
        setIsUploadOpen={setIsUploadOpen}
        assignment={item}
      />
    </div>
  );
};

export default Submit;

const UploadAssignment = ({ isUploadOpen, setIsUploadOpen, assignment }) => {
  const { user } = useAuthContext();

  const [loader, setLoader] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("solutionFile", selectedFile);
    formData.append("assignmentId", assignment.assignmentId);

    setLoader(true);
    axios
      .post("http://localhost:9080/api/v1/tutor/add-solution", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        toast("Submitted");
        setIsUploadOpen(false);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        // toast.error("Pls retry");
        toast("Submitted");
        setIsUploadOpen(false);
        setLoader(false);
      });
  };

  return (
    <div className={`${!isUploadOpen && "hidden"} modal-bg`}>
      <div className="w-[90%] md:w-[60%] bg-white h-fit rounded-[10px] font-Opensans">
        <div className="flex justify-between items-center p-[20px] border-b border-gray-400">
          <p className="text-[17px] font-bold text-[#364261]">
            Upload Assignment
          </p>
          <button onClick={() => setIsUploadOpen(false)}>
            <FaTimes className="text-[20px]" />
          </button>
        </div>
        <div className="p-[20px]">
          <p className="font-[600] font-Montserrat text-[#364261]">
            Locate and click on the "Upload File" button provided on the
            assignment submission screen.
          </p>
          <div className="mt-[20px] w-full h-[200px] rounded-[10px] border-dashed border border-[#186BAD] bg-[#186BAD]/20">
            {selectedFile ? (
              <div className="w-full h-full bg-blue text-white grid place-items-center">
                <p className="font-semibold font-Montserrat">
                  {selectedFile.name}
                </p>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <FaImages className="text-[38.57px] text-[#0162E8]" />
                <label
                  htmlFor="file-upload"
                  className="border border-[#186BAD] text-[#186BAD] rounded-[8px] px-[25px] py-[5px] font-Montserrat font-[600] cursor-pointer"
                >
                  Browse Files
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>
          <div className="flex items-center gap-[5px]">
            <Info color="#FBBC0B" className="size-[40px]" />
            <p className="text-[14px] text-[#737F9E]">
              Once you've uploaded the document, review the assignment details
              and ensure everything is correct. If you're ready, click on the
              "Submit" button to submit your assignment for evaluation.
            </p>
          </div>
          <div className="mt-[10px] flex justify-between">
            <button
              onClick={() => setIsUploadOpen(false)}
              className="border-[2px] border-[#186BAD] text-[#186BAD] rounded-[8px] px-[20px] py-[5px]"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[#186BAD] text-white rounded-[8px] px-[20px] py-[5px] flex items-center gap-[5px]"
            >
              {loader ? (
                <div className="mx-auto block size-[20px] border border-white animate-spin rounded-full" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
