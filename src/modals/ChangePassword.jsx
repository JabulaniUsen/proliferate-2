import React from "react";
import { useGlobalContext } from "../context/globalContext";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const ChangePassword = () => {
  const { isChangePassOpen, setIsChangePassOpen } = useGlobalContext();

  return (
    <div
      className={`change-password ${!isChangePassOpen && "hidden"}  modal-bg`}
    >
      <div className="w-[70%] rounded-b-[15px] bg-white h-fit font-Poppins">
        <h3 className="w-full bg-blue py-[10px] text-[20px] font-[600] text-white text-center">
          Change Password{" "}
        </h3>
        <div className="p-[30px]">
          <p className="text-[14px] text-justify">
            You may update your password any time. We suggest you choose a
            strong password and update it regularly, e.g. every 6 months. All
            new passwords must contain at least 8 characters.We also suggest
            having at least one capital and one lower-case letter (Aa-Zz), one
            special symbol (#, &, % etc), and one number (0-9) in your password
            for the best strength.
          </p>

          <section className="my-[30px] flex flex-col gap-[20px]">
            <div>
              <label htmlFor="npass">New Password*</label>
              <span>
                <input type="text" id="npass" />
                <button>{true ? <FaEyeSlash /> : <FaEye />}</button>
              </span>
            </div>

            <div>
              <label htmlFor="cnpass">Confirm New Password*</label>
              <span>
                <input type="text" id="cnpass" />
                <button>{true ? <FaEyeSlash /> : <FaEye />}</button>
              </span>
            </div>

            <div>
              <label htmlFor="ppass">Proliferte Password*</label>
              <span>
                <input type="text" id="ppass" />
                <button>{true ? <FaEyeSlash /> : <FaEye />}</button>
              </span>
            </div>
          </section>

          <div className="flex justify-center gap-[30px] items-center">
            <button
              onClick={() => setIsChangePassOpen(false)}
              to="/classes/reschedule-class"
              className="px-[20px] py-[10px] bg-[#186BAD] rounded-[10px] text-bold text-white"
            >
              Save Changes
            </button>

            <button
              onClick={() => setIsChangePassOpen(false)}
              className="text-[red] rounded-[6px] text-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
