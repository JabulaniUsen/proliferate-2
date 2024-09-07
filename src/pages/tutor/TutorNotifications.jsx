import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchData } from "../../utils/fetchData";
import { useAuthContext } from "../../context/authContext";
import { FaRegTrashCan as FaTrash } from "react-icons/fa6";
import avatar from "../../assets/userAvatar.png";

const TutorNotifications = () => {
  const { user } = useAuthContext();
  const [notis, setNotis] = useState([]);

  const getNotifications = () => {
    fetchData(
      "https://formal-saloma-proliferate-41ba3b45.koyeb.app/api/v1/tutor/notifications",
      user.token
    )
      .then((res) => {
        setNotis(res);
      })
      .catch((err) => console.log(err.message));
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
      <div className="w-full pt-[57.58px] px-[20px] md:pl-[30px] 2xl:pl-[81px] pb-[33.5px] border-b border-[#969696]">
        <h1 className="font-Montserrat font-bold text-[32px]">Notifications</h1>
      </div>

      <div className="py-[40.5px] px-[30px] sm:pl-[30px] md:pr-[100px] 2xl:pl-[81px] flex flex-col gap-[65px]">
        {notis
          .slice()
          .reverse()
          .map((noti, i) => (
            <Notification key={i} noti={noti} />
          ))}
      </div>
    </motion.div>
  );
};

export default TutorNotifications;

const Notification = ({ noti }) => {
  return (
    <div className="flex items-center">
      <input className="w-[20px] h-[20px]" type="checkbox" />
      <div className="mx-[20px] rounded-full bg-[gray]/20 size-[73px] overflow-hidden">
        {noti.profileImage ? (
          <img
            className="size-full object-cover"
            src={`data:image/jpeg;base64,${noti?.profileImage}`}
            alt="tutor"
          />
        ) : (
          <img className="size-full object-cover" src={avatar} alt="tutor" />
        )}
      </div>
      <span className="flex-1 ml-[10px] vsm:ml-0 mr-[20px] text-[12px] md:text-[14px] font-Opensans">
        <p>{noti.message}</p>
        <p className="mt-[10px]">{noti.timeAgo}</p>
      </span>
      <FaTrash className="text-[#D9734C] text-[18px]" />
    </div>
  );
};
