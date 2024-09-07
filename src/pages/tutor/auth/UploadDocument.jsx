import React from "react";
import { MdArrowForwardIos as Arrow } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { IoDocument } from "react-icons/io5";
import { GoFileDirectoryFill as GoFile } from "react-icons/go";
import { useAuthContext } from "../../../context/authContext";
import { useGlobalContext } from "../../../context/globalContext";


const UploadDocument = () => {
  const navigate = useNavigate();
  const { tutorFormData, setTutorFormData } = useAuthContext();
  const {  setModalErr } = useGlobalContext();

  const handleFileChange = (event, fileType) => {
    const file = event.target.files[0];

    setTutorFormData((prev) => ({
      ...prev,
      [fileType]: file,
    }));
  };

  const handleBrowseClick = (fileInputId) => {
    document.getElementById(fileInputId).click();
  };

  const handleRemoveClick = (fileType, fileId) => {
    setTutorFormData((prev) => ({
      ...prev,
      [fileType]: null,
    }));

    const fileInput = document.getElementById(fileId);
    if (fileInput) {
      fileInput.value = null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      tutorFormData.educationalCertificates == null ||
      tutorFormData.resumeCurriculumVitae == null ||
      tutorFormData.professionalDevelopmentCert == null ||
      tutorFormData.identificationDocuments == null
    ) {

      setModalErr({
        title: "Upload Documents",
        body:"Please upload all required documents to proceed"
      });
      return;
    }

    setTutorFormData({
      ...tutorFormData,
      educationalCertificates: tutorFormData.educationalCertificates,
      resumeCurriculumVitae: tutorFormData.resumeCurriculumVitae,
      professionalDevelopmentCert: tutorFormData.professionalDevelopmentCert,
      identificationDocuments: tutorFormData.identificationDocuments,
    });
    navigate("/auth/tutor/register/terms-and-conditions");
  };

  const documentNames = [
    "Educational Certificates",
    "Resume or Curriculum Vitae (CV)",
    "Professional Development Certificates",
    "Identification Documents and others",
  ];

  return (
    <>
      <div className="auth-page auth-upload-page font-Montserrat shadow-custom">
        <p className="text-[18px] font-Opensans text-center font-bold">
          List of Documents to upload
        </p>
        <ul className="mt-[16px] lg:flex gap-[20px] justify-center items-center list-disc list-outside vsm:list-inside">
          {documentNames.map((item, i) => (
            <li className="text-[14px]" key={i}>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-[20px] w-full xmd:flex items-center justify-center">
          <span className="flex gap-[10px] items-center text-[17px] sm:text-[20px] 2xl:text-[24px]">
            <IoDocument className="text-blue text-[30px] sm:text-[20px]" />
            <p className="font-bold text-[#242F48] leading-[1.1]">
              Educational Supporting Documents
            </p>
          </span>
        </div>

        <div className="upload-grid mt-[30px] flex flex-col xmd:grid grid-cols-2 gap-[20px]">
          {/* Educational Certificates */}
          <div>
            <div className="select">
              <GoFile />
              <p>Add Educational Certificate</p>
              <h5>(DOC, DOCX, PDF, PNG, JPEG formats)</h5>
              <button type="button" onClick={() => handleBrowseClick("file1")}>
                Browse Files
              </button>
              <input
                type="file"
                id="file1"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                onChange={(e) => handleFileChange(e, "educationalCertificates")}
                style={{ display: "none" }}
              />
            </div>
            {tutorFormData.educationalCertificates && (
              <div className="file">
                <GoFile />
                <p>{tutorFormData.educationalCertificates.name}</p>
                <button
                  type="button"
                  onClick={() =>
                    handleRemoveClick("educationalCertificates", "file1")
                  }
                >
                  REMOVE
                </button>
              </div>
            )}
          </div>

          {/* Resume or Curriculum Vitae */}
          <div>
            <div className="select">
              <GoFile />
              <p>Add Resume or CV</p>
              <h5>(DOC, DOCX, PDF, PNG, JPEG formats)</h5>
              <button type="button" onClick={() => handleBrowseClick("file2")}>
                Browse Files
              </button>
              <input
                type="file"
                id="file2"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                onChange={(e) => handleFileChange(e, "resumeCurriculumVitae")}
                style={{ display: "none" }}
              />
            </div>
            {tutorFormData.resumeCurriculumVitae && (
              <div className="file">
                <GoFile />
                <p>{tutorFormData.resumeCurriculumVitae.name}</p>
                <button
                  type="button"
                  onClick={() =>
                    handleRemoveClick("resumeCurriculumVitae", "file2")
                  }
                >
                  REMOVE
                </button>
              </div>
            )}
          </div>

          {/* Professional Development Certificates */}
          <div>
            <div className="select">
              <GoFile />
              <p>Add Professional Development Certificate</p>
              <h5>(DOC, DOCX, PDF, PNG, JPEG formats)</h5>
              <button type="button" onClick={() => handleBrowseClick("file3")}>
                Browse Files
              </button>
              <input
                type="file"
                id="file3"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                onChange={(e) =>
                  handleFileChange(e, "professionalDevelopmentCert")
                }
                style={{ display: "none" }}
              />
            </div>
            {tutorFormData.professionalDevelopmentCert && (
              <div className="file">
                <GoFile />
                <p>{tutorFormData.professionalDevelopmentCert.name}</p>
                <button
                  type="button"
                  onClick={() =>
                    handleRemoveClick("professionalDevelopmentCert", "file3")
                  }
                >
                  REMOVE
                </button>
              </div>
            )}
          </div>

          {/* Identification Documents */}
          <div>
            <div className="select">
              <GoFile />
              <p>Add Identification Document</p>
              <h5>(DOC, DOCX, PDF, PNG, JPEG formats)</h5>
              <button type="button" onClick={() => handleBrowseClick("file4")}>
                Browse Files
              </button>
              <input
                type="file"
                id="file4"
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                onChange={(e) => handleFileChange(e, "identificationDocuments")}
                style={{ display: "none" }}
              />
            </div>
            {tutorFormData.identificationDocuments && (
              <div className="file">
                <GoFile />
                <p>{tutorFormData.identificationDocuments.name}</p>
                <button
                  type="button"
                  onClick={() =>
                    handleRemoveClick("identificationDocuments", "file4")
                  }
                >
                  REMOVE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="auth-footer">
        <Link to="/auth/tutor/register/availability-and-preference">
          <p>Back</p>
        </Link>

        <button onClick={handleSubmit}>
          <p>Next</p>
          <Arrow />
        </button>
      </div>
    </>
  );
};

export default UploadDocument;
