import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown as Arrow } from "react-icons/md";
import { IoDocumentTextSharp as Doc } from "react-icons/io5";
import { toast } from "react-toastify";

const Assignment = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-[456px]">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-[12px] py-[16px] flex items-center justify-between border border-[red] cursor-pointer"
      >
        <p className="text-[14px] font-Opensans text-[#333333] font-bold capitalize">
          {item.title}
        </p>

        <Arrow className={!isOpen && "rotate-180"} />
      </div>

      <div
        className={`${
          isOpen ? "h-fit " : "h-0 overflow-hidden"
        } w-full duration-200 `}
      >
        <p className="mt-[10px] pl-[10px] text-[14px] font-Opensans">
          <span className="font-bold">Description:</span> {item.description}
        </p>
        <div className="my-[10px] flex justify-between flex-wrap gap-[10px]">
          <DownloadFileButton
            base64String={item.assignmentFileBase64}
            fileName={`${item.title}.pdf`}
          />
        </div>
        <div className="flex justify-end items-center text-[#1D8EED]">
          <p className="font-bold font-Inter">Due Date: {item.dueDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Assignment;

const DownloadFileButton = ({ base64String, fileName }) => {
  
  const handleDownload = () => {
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
    <div
      onClick={handleDownload}
      className="w-fit cursor-pointer border border-blue-200 rounded-[18px] px-[12px] py-[3px] flex items-center gap-[5px] "
    >
      <Doc color="#1D8EED" />
      <p className="text-[12px] font-medium">{fileName}</p>
    </div>
  );
};
