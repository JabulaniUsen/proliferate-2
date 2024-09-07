import React from "react";
import { FaTimes, FaDownload, FaImages } from "react-icons/fa";
import { useGlobalContext } from "../context/globalContext";
import { IoMdInformationCircle as Info } from "react-icons/io";

const UploadDocumentModal = () => {
  const { isUploadDocOpen, setIsUploadDocOpen } = useGlobalContext();

  return (
    <div className={`${!isUploadDocOpen && "hidden"} modal-bg`}>
      <div className="w-[90%] md:w-[60%] bg-white h-fit rounded-[10px] font-Opensans">
        <div className="flex justify-between items-center p-[20px] border-b border-gray-400">
          <p className="text-[17px] font-bold text-[#364261]">
            Upload Document
          </p>

          <button onClick={() => setIsUploadDocOpen(false)}>
            <FaTimes className="text-[20px]" />
          </button>
        </div>
        <div className="p-[20px]">
          <p className="font-[600] font-Montserrat text-[#364261]">
            Our Admininstrative Department will be looking at your uploaded
            files within{" "}
            <span className="text-[#EE335E]">1-2 business days</span>. If you
            have an inquiry or need to send the files directly, you may email us
            at <span className="text-[#0162E8]">tutor@proliferate.ai</span>
          </p>
          <div className="mt-[20px] w-full h-[200px] flex flex-col items-center justify-center rounded-[10px] border-dashed border border-[#186BAD] bg-[#186BAD]/20">
            <FaImages className="text-[38.57px] text-[#0162E8]" />
            <p className="my-[10px] text-[#364261] font-Montserrat font-[600]">
              Drag and Drop Files here or
            </p>
            <button className="border border-[#186BAD] text-[#186BAD] rounded-[8px] px-[25px] py-[5px] font-Montserrat font-[600]">
              Browse Files
            </button>
          </div>
          <div className="flex items-center gap-[5px]">
            <Info color="#FBBC0B" className="size-[30px]" />
            <p className="text-[14px] text-[#737F9E]">
              By Browsing the file and uploading, this will submit the files
              automatically (No need to re-submit)
            </p>
          </div>
          <div className="mt-[10px] flex justify-between">
            <button
              onClick={() => setIsUploadDocOpen(false)}
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

export default UploadDocumentModal;
