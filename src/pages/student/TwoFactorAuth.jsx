import React, { useState } from "react";
import { FaCommentDots } from "react-icons/fa";

const TwoFactorAuth = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="py-[30px] font-Poppins">
      <p className="text-[20px] font-[600]">Two-Factor Authentication</p>
      <div className="mt-[20px] flex justify-between items-center">
        <p className="w-[75%] text-[14px] font-[500]">
          Two-factor authentication, also known as 2FA or multi-factor, adds an
          extra layer of security to your account beyond your username and
          password. When you login with 2FA enabled, you will be prompted to use
          a security key, enter a verification code or approve the login from
          your mobile device, depending on which method you choose below.
        </p>
        <div>
          <div
            onClick={() => setIsOn((prev) => !prev)}
            className={`${
              isOn ? "bg-blue" : "bg-gray-500"
            } relative cursor-pointer w-[90px] h-[40px] rounded-[50px] flex justify-between items-center px-[10px] text-white font-medium text-[13px]`}
          >
            <p>ON</p>
            <p>OFF</p>

            <div
              className={`${
                isOn ? "left-[48.5%]" : "left-[2px]"
              } absolute top-[50%] -translate-y-[50%] duration-200 bg-white h-[90%] w-[50%] rounded-full`}
            />
          </div>
        </div>
      </div>

      <div className="mt-[80px] ">
        <div className="mb-[20px] pb-[13.5px] border-b border-[#00000040] flex justify-between items-center">
          <p className="text-[14px] font-[600]">Text Message Authentication</p>
          <button className="bg-blue text-white rounded-[5px] px-[10px] py-[4px]">
            ADD CONTACT NUMBER
          </button>
        </div>

        <div className="flex items-center text-[14px] text-[#00000080]">
          <div className="w-[86px] h-[78px] bg-[#D9D9D9] rounded-full grid place-items-center">
            <FaCommentDots className="text-[40px] text-blue" />
          </div>

          <span className="ml-[29px] mr-[141px]">
            <p className="text-black font-[600]">Phone Number</p>
            <p>+xxxxxxxxxxxx</p>
          </span>

          <span>
            <p>Text Message</p>
            <p className="text-center">xxxxxx</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
