import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Star from "../../components/Star";
import { useAuthContext } from "../../context/authContext";
import axios from "axios";
import LoadingPage from "../../components/LoadingPage";
import userAvatar from "../../assets/userAvatar.png";
import { useUser } from "../../context/userContext";

const TutorProfile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { paymentDetails, setPaymentDetails } = useUser();

  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `https://formal-saloma-proliferate-41ba3b45.koyeb.app/api/v1/student/get-tutorProfile/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
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

  const handleNext = () => {
    setPaymentDetails({ ...paymentDetails, tutor: { ...profile } });
    navigate(`/tutors/${params.id}/order-details`);
  };

  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="px-[30px] py-[50px] flex gap-[20px]">
          <div className="w-[166px] flex flex-col items-center">
            <div className="w-full h-[172px] border border-blue">
              {profile?.profileImage ? (
                <img
                  className="size-full object-cover"
                  src={`data:image/jpeg;base64,${profile?.profileImage}`}
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
            <p className="font-bold">{profile?.fullName}</p>
            <p className="capitalize">{paymentDetails.subject} Tutor</p>
            <span className="flex text-[#DE4B18] gap-[5px]">
              {Array.from({ length: Math.round(profile?.rating) }).map(
                (_, i) => (
                  <Star key={i} filled />
                )
              )}
              {Array.from({ length: Math.round(5 - profile?.rating) }).map(
                (_, i) => (
                  <Star key={i} />
                )
              )}
            </span>
          </div>

          <div className="flex-1">
            <ul className="text-[14px] font-Opensans  list-disc list-inside leading-[35px]">
              <li>
                <span className="font-bold">Subject Expertise:</span>{" "}
                {profile?.subjectExpertise?.join(", ")}
              </li>
              <li>
                <span className="font-bold">Qualifications:</span>{" "}
                {profile?.qualification}
              </li>
              <li>
                <span className="font-bold">Teaching Style:</span>{" "}
                {profile?.teachingStyle}
              </li>
              <li>
                <span className="font-bold">Availability:</span> Evenings
                (Mon/Wed/Fri), Weekends (Sat/Sun)
              </li>
              <li>
                <span className="font-bold">Rating:</span> {profile?.rating}/5
                (Based on student feedback)
              </li>
              {profile?.bio != null && (
                <li>
                  <span className="font-bold">Bio:</span> {profile?.bio}
                </li>
              )}
            </ul>

            <div className="mt-[20px] flex gap-[10px]">
              <button className="mt-[15px] px-[17px] py-[6px] rounded-[5px] border border-[gray] text-blue font-medium">
                Chat
              </button>
              <button className="mt-[15px] px-[17px] py-[6px] rounded-[5px] border border-[gray] text-blue font-medium">
                Evaluation Call
              </button>
              <button
                onClick={handleNext}
                className="mt-[15px] px-[17px] py-[6px] rounded-[5px] bg-blue text-white font-medium"
              >
                Enroll In Class
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorProfile;
