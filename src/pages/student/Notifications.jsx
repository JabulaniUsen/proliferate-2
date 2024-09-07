import React, { useEffect, useState } from "react";
import { FaRegTrashCan as FaTrash } from "react-icons/fa6";
import avatar from "../../assets/userAvatar.png";
import { motion } from "framer-motion";
import { fetchData } from "../../utils/fetchData";
import { useAuthContext } from "../../context/authContext";
import LoadingPage from "../../components/LoadingPage";

const Notifications = () => {
  const { user } = useAuthContext();

  const [notis, setNotis] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNotifications = () => {
    setLoading(true);
    fetchData(
      "https://formal-saloma-proliferate-41ba3b45.koyeb.app/api/v1/student/notifications",
      user.token
    )
      .then((res) => {
        setNotis(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {loading ? (
        <LoadingPage />
      ) : (
        <div>
          <div className="w-full pt-[57.58px] px-[20px] md:pl-[30px] 2xl:pl-[81px] pb-[33.5px] border-b border-[#969696]">
            <h1 className="font-Montserrat font-bold text-[32px]">
              Notifications
            </h1>
          </div>

          <div className="py-[40.5px] px-[30px] sm:pl-[30px] md:pr-[100px] 2xl:pl-[81px] flex flex-col gap-[65px]">
            {notis.map((noti, i) => (
              <Notification key={i} noti={noti} />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Notifications;

const Notification = ({ noti }) => {
  return (
    <div className="flex items-center">
      {/* <input className="w-[20px] h-[20px]" type="checkbox" /> */}
      <img
        className="hidden vsm:block ml-[10px] md:ml-[20px] mr-[15px] md:mr-[25px] w-[50px] md:w-[73px] h-[50px] md:h-[73px]"
        src={avatar}
        alt="avatar"
      />
      <span className="flex-1 ml-[10px] vsm:ml-0 mr-[20px] text-[12px] md:text-[14px] font-Opensans">
        <p>{noti.message}</p>
        <p className="mt-[10px]">{noti.timeAgo}</p>
      </span>
      <FaTrash className="text-[#D9734C] text-[18px]" />
    </div>
  );
};
