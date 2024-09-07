import React, { useEffect, useState } from "react";
import { TbSend2 as Send } from "react-icons/tb";
import { Link } from "react-router-dom";
import userAvatar from "../../assets/userAvatar.png";
import { useAuthContext } from "../../context/authContext";
import axios from "axios";
import LoadingPage from "../../components/LoadingPage";

const Tutors = () => {
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [tutors, setTutors] = useState([]);

  console.log(user.token);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://formal-saloma-proliferate-41ba3b45.koyeb.app/api/v1/student/get-tutors",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setTutors(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : (
        <div>
          <div className="heading">
            <h1>Tutors</h1>
          </div>

          <div className="pt-[40px] pl-[30px] 2xl:pl-[82px] ">
            <div className="w-fit">
              <div className="w-full border-t border-[#D1D1D1]" />
              {tutors.map((tutor, i) => (
                <Tutor key={i} tutor={tutor} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tutors;

const Tutor = ({ tutor }) => {
  return (
    <div className="w-fit py-[10px] px-[10px] border-b border-[#D1D1D1] flex items-center ">
      <Link
        to={`/tutors/tutor/${tutor.tutorId}`}
        className="ml-[20px] flex items-center gap-[10px]"
      >
        <div className="size-[40px] rounded-full overflow-hidden">
          {tutor.tutorImage ? (
            <img
              className="size-full object-cover rounded-full"
              src={`data:image/jpeg;base64,${tutor.tutorImage}`}
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
        <p className="text-[14px] capitalize font-DMsans font-semibold">
          {tutor.fullName}
        </p>
      </Link>
      <button className="ml-[30px] mr-[50px] bg-[#D4F8D3] px-[12px] py-[4px] rounded-[20px] text-[14px] font-DMsans">
        Active
      </button>
      <Send className="text-[20px] text-[#DE4B18]" />
    </div>
  );
};
