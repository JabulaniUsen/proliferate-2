import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Star from "../../components/Star";
import { useAuthContext } from "../../context/authContext";
import axios from "axios";
import LoadingPage from "../../components/LoadingPage";
import userAvatar from "../../assets/userAvatar.png";
import { useUser } from "../../context/userContext";

const TutorList = ({ loading, tutors }) => {
  const { user } = useAuthContext();

  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="w-full flex flex-wrap gap-[30px]">
          {tutors.map((tutor, i) => (
            <Tutor key={i} tutor={tutor} token={user.token} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TutorList;

const Tutor = ({ tutor, token }) => {
  const { paymentDetails } = useUser();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `https://formal-saloma-proliferate-41ba3b45.koyeb.app/api/v1/student/get-tutorProfile/${tutor.tutorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setProfile(res.data);
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
        <div className="mx-[50px] my-[20px] border-l size-[20px] border-blue rounded-full animate-spin" />
      ) : (
        <div className="flex flex-col items-center font-Montserrat">
          <div className="w-[166px] h-[172px] border border-blue overflow-hidden">
            {profile.profileImage ? (
              <img
                className="size-full object-cover"
                src={`data:image/jpeg;base64,${profile.profileImage}`}
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
          <p className="font-bold">{profile.fullName}</p>
          <p className="capitalize">{paymentDetails.subject} Tutor</p>
          <span className="flex text-[#DE4B18] gap-[5px]">
            {Array.from({ length: Math.round(profile.rating) }).map((_, i) => (
              <Star key={i} filled />
            ))}
            {Array.from({ length: Math.round(5 - profile.rating) }).map(
              (_, i) => (
                <Star key={i} />
              )
            )}
          </span>
          <Link
            to={`/tutors/${tutor.tutorId}/profile`}
            className="mt-[5px] border border-[#D9734C] px-[17px] py-[6px] rounded-[5px] font-medium"
          >
            View Profile
          </Link>
        </div>
      )}
    </div>
  );
};
