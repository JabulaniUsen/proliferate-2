import React from "react";
import { Link } from "react-router-dom";
import lock from "../../assets/lockIcon.png";
import { useGlobalContext } from "../../context/globalContext";

const TutorLoginSettings = () => {
  const { setIsChangePassOpen } = useGlobalContext();

  return (
    <div className="py-[30px]">
      <div className="flex gap-[10px] font-Poppins">
        <div className="w-fit">
          <img src={lock} alt="lock" />
        </div>
        <div className="flex-1">
          <p className="text-[12px] ">
            Your privacy and security are top priority. We do all we can to keep
            your account secure, and we encourage you to do the same by
            following best practices: Update your password regularly, enable
            Two-Factor Authentication, and keep your Support PIN private.
          </p>

          <div className="mt-[50px] flex flex-col gap-[40px]">
            <div className="flex justify-between pb-[20px] border-b border-[#00000040]">
              <p className="text-[12px] font-[600] ">Password</p>
              <p className="text-[12px]">
                Changed on Oct 31, 2022, 2:29 PM EDT <br />
                <span className="text-[10px]">
                  * In order to remove captcha from login screen you need to
                  change your password every 6 months.
                </span>
              </p>
              <button
                onClick={() => setIsChangePassOpen(true)}
                className="bg-[#D9D9D9] rounded-[10px] px-[15px] py-[4px] text-[12px] font-[600]"
              >
                EDIT
              </button>
            </div>
            <div className="flex justify-between pb-[20px] border-b border-[#00000040]">
              <p className="text-[12px] font-[600] ">
                Two-Factor Authentication
              </p>
              <p className="text-[12px]">ON (SMS)</p>
              <Link
                to="/tutor/settings/two-factor-auth"
                className="bg-[#D9D9D9] rounded-[10px] px-[15px] py-[4px] text-[12px] font-[600]"
              >
                MANAGE
              </Link>
            </div>
            <div className="flex justify-between pb-[20px] border-b border-[#00000040]">
              <p className="text-[12px] font-[600] ">Support PIN</p>
              <p className="text-[12px]">Valid till Jan 5, 2024, 9:40 AM EST</p>
              <button className="bg-[#D9D9D9] rounded-[10px] px-[15px] py-[4px] text-[12px] font-[600]">
                REFRESH
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorLoginSettings;
