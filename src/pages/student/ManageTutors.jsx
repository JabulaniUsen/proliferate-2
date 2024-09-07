import React, { useEffect, useState } from "react";
import userAvatar from "../../assets/userAvatar.png";
import { toast } from "react-toastify";
import LoadingPage from "../../components/LoadingPage";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";

const ManageTutors = () => {
  const navigate = useNavigate();
  const { tutors, getTutors } = useUser();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getTutors();
  }, []);

  return (
    <div>
      {tutors == "loading" ? (
        <LoadingPage />
      ) : (
        <div>
          <div className="heading">
            <h1>Manage Tutors</h1>
          </div>

          <div className="pt-[40px] pl-[30px] 2xl:pl-[82px] ">
            <div className="w-fit">
              <div className="w-full border-t border-[#D1D1D1] " />
              {Array.isArray(tutors) &&
                tutors.map((tutor, i) => <Tutor key={i} tutor={tutor} />)}
            </div>

            <div className="mt-[50px] flex gap-[20px]">
              <button
                onClick={() => navigate("/classes/reschedule-class")}
                className="px-[20px] py-[10px] bg-[#186BAD] text-white rounded-[8px]"
              >
                Reschedule Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTutors;

const Tutor = ({ tutor }) => {
  return (
    <div className="w-fit py-[10px] px-[10px] border-b border-[#D1D1D1] flex items-center ">
      <input type="checkbox" name="" id="" />
      <span className="ml-[20px] flex items-center gap-[10px]">
        <div className="size-[40px] rounded-full overflow-hidden">
          {tutor.profileImage ? (
            <img
              className="size-full object-cover rounded-full"
              src={`data:image/jpeg;base64,${tutor.profileImage}`}
              alt="icon"
            />
          ) : (
            <img
              className="size-full object-cover rounded-full"
              src={userAvatar}
              alt="icon"
            />
          )}
        </div>
        <p className="text-[14px] font-DMsans font-semibold capitalize">
          {tutor.fullName}
        </p>
      </span>
      <button className="ml-[30px]  bg-[#D4F8D3] px-[12px] py-[4px] rounded-[20px] text-[14px] font-DMsans">
        Active
      </button>
    </div>
  );
};
