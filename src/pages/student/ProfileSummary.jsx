import { MdOutlineStar } from "react-icons/md";
import LoadingPage from "../../components/LoadingPage";
import { useUser } from "../../context/userContext";
import avatar from "../../assets/userAvatar.png";
import { useAuthContext } from "../../context/authContext";
import { useEffect, useState } from "react";
import { fetchData } from "../../utils/fetchData";

const ProfileSummary = () => {
  const { user } = useAuthContext();
  const { profile, getBio } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBio();
  }, []);

  const fetchBio = async () => {
    setLoading(true);
    await getBio();
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="py-[10px]">
          <div className="flex gap-[20px] items-center">
            <div className="size-[200px] rounded-full overflow-hidden">
              {profile?.profileImage ? (
                <img
                  className="h-full w-full object-cover"
                  src={`data:image/jpeg;base64,${profile?.profileImage}`}
                  alt="student"
                />
              ) : (
                <img
                  className="h-full w-full object-cover"
                  src={avatar}
                  alt="student"
                />
              )}
            </div>
            <div className="font-Inter">
              <h1 className="text-[32px] font-Inter font-[600]">
                {profile?.fullName}
              </h1>
            </div>
          </div>
          <div className="font-Inter mt-[20px] flex gap-[30px]">
            <div className="w-full">
              <h1 className="font-medium text-[20px]">BIO</h1>
              <div className="mt-[10px] flex flex-col gap-[20px] text-[14px] font-Opensans text-[#080808]">
                <p className="">{profile?.bio}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSummary;

const ReviewItem = () => {
  return (
    <div className="w-[300px]">
      <div className="flex gap-[10px]">
        <div className="size-[40px] rounded-full bg-blue"></div>
        <div>
          <div className="flex gap-[10px] items-center">
            <p className="text-[#1D2026] text-[14px]">Guy Hawkins</p>
            <div className="size-[2px] bg-black"></div>
            <p className="text-[12px] text-[#6E7485]">1 min ago</p>
          </div>
          <span className="flex gap-[2px]">
            <MdOutlineStar color="gold" />
            <MdOutlineStar color="gold" />
            <MdOutlineStar color="gold" />
            <MdOutlineStar color="gold" />
            <MdOutlineStar color="gold" />
          </span>
        </div>
      </div>
      <p className="mt-[10px] text-justify text-[14px] text-[#4E5566]">
        I appreciate the precise short videos (10 mins or less each) because
        overly long videos tend to make me lose focus. The instructor is very
        knowledgeable in Web Design and it shows as he shares his knowledge.
        These were my best 6 months of training. Thanks, Vako.
      </p>
    </div>
  );
};
