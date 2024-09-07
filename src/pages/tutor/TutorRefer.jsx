import React from "react";
import { motion } from "framer-motion";

const TutorRefer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="w-full pt-[57.58px] pl-[30px] 2xl:pl-[81px] pb-[33.5px] border-b border-[#969696]">
        <h1 className="font-Montserrat font-bold text-[32px]">
          Refer a Friend
        </h1>
      </div>

      <div className="px-[30px] vsm:pl-[30px] 2xl:pl-[81px] py-[47.5px]">
        <p className="text-[14px] font-Opensans">
          Fill out your friend's email address, to invite them.
        </p>

        <div className="mt-[40px] mb-[121px]">
          <label
            className="text-[24px] font-[600] font-Montserrat"
            htmlFor="mail"
          >
            Email Address:
          </label>
          <input
            className="mb-[40px] w-[80%] vsm:w-[336px] block border border-[#CCCCCC] p-[8px] vsm:p-[16px] rounded-[8px]"
            type="email"
            id="mail"
            placeholder="Type here"
          />
          <button className="bg-[#186BAD] rounded-[8px] px-[20px] py-[10px] font-[600] font-Montserrat text-white">
            Send Invitation
          </button>
        </div>

        <div className="text-[14px] font-Opensans">
          <h4 className="font-bold mb-[10px]">Notes:</h4>
          <p className="leading-[30px]">
            By clicking "Send Invitation," you agree to our terms and conditions
            and acknowledge that you have permission <br /> to share your
            friend's contact information.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TutorRefer;
