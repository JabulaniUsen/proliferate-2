import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import axios from "axios";
import userAvatar from "../../assets/userAvatar.png";
import { Link, useParams } from "react-router-dom";

const TutorDetails = () => {
  const { user } = useAuthContext();
  const params = useParams();

  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `https://formal-saloma-proliferate-41ba3b45.koyeb.app/api/v1/student/get-tutorProfile/${params?.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
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
        <div className="h-[70vh] w-full grid place-items-center">
          <div className="border-l-[2px] border-l-blue rounded-full size-[50px] animate-spin" />
        </div>
      ) : (
        <div>
          <div className="heading">
            <h1>Tutors</h1>
          </div>

          <div className="pt-[40px] px-[30px] 2xl:px-[82px] flex gap-[20px]">
            <div className="w-[166px]">
              <div className="w-full h-[172px] border-blue border rounded-[10px] overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={userAvatar}
                  alt="user"
                />
              </div>
              <p className="font-[600] font-Montserrat text-center capitalize">
                {profile.fullName}
              </p>
              <p className="text-[14px] font-Opensans text-center">
                {profile?.subjectExpertise.join(", ")} Tutor
              </p>
            </div>

            <div className="flex-1">
              <ul className="text-[14px] font-Opensans  list-disc list-inside leading-[35px]">
                <li>
                  <span className="font-bold">Subject Expertise:</span>{" "}
                  {profile?.subjectExpertise.join(", ")}
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
                  (Based on students feedback)
                </li>
                {/* <li>
                  <span className="font-bold">Bio:</span> {profile?.bio}
                </li> */}
              </ul>

              <div className="mt-[28px] flex gap-[20px]">
                <Link
                  to="/feedback"
                  className="px-[20px] py-[10px] bg-blue text-white rounded-[8px]"
                >
                  Send a feedback
                </Link>
                {/* <button className="px-[20px] py-[10px] border border-[#D9734C] rounded-[8px]">
                  Review
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorDetails;
