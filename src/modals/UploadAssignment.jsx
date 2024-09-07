import React, { useState } from "react";
import { FaTimes, FaDownload, FaImages } from "react-icons/fa";
import { useGlobalContext } from "../context/globalContext";
import { IoMdInformationCircle as Info } from "react-icons/io";

const UploadAssignment = () => {
  const { isUploadOpen, setIsUploadOpen } = useGlobalContext();

  const [selectedFile, setSelectedFile] = useState(null);

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
          <div className="mt-[20px] w-full h-[200px] flex flex-col items-center justify-center rounded-[10px] border-dashed border border-[#186BAD] bg-[#186BAD]/20">
            {selectedFile ? (
              <div></div>
            ) : (
              <div>
                <FaImages className="text-[38.57px] text-[#0162E8]" />

                <button className="border border-[#186BAD] text-[#186BAD] rounded-[8px] px-[25px] py-[5px] font-Montserrat font-[600]">
                  Browse Files
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-[5px]">
            <Info color="#FBBC0B" className="size-[40px]" />
            <p className="text-[14px] text-[#737F9E]">
              Once you've uploaded the document(s), review the assignment
              details and ensure everything is correct. If you're ready, click
              on the "Submit" button to submit your assignment for evaluation.
            </p>
          </div>
          <div className="mt-[10px] flex justify-between">
            <button
              onClick={() => setIsUploadOpen(false)}
              className="border-[2px] border-[#186BAD] text-[#186BAD] rounded-[8px] px-[20px] py-[5px]"
            >
              Cancel
            </button>
            <button className="bg-[#186BAD] text-white rounded-[8px] px-[20px] py-[5px] flex items-center gap-[5px]">
              <FaDownload /> Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadAssignment;
