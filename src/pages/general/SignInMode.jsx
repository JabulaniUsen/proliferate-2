import React from "react";
import { Link, useNavigate } from "react-router-dom";
import authImg from "../../assets/authImg.png";
import logo from "../../assets/logo.png";
import { FaUserGraduate as StudentIcon } from "react-icons/fa";
import { ImUserTie as TutorIcon } from "react-icons/im";

const SignInMode = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen vsm:h-screen flex font-Montserrat">
      <img
        onClick={() => navigate("/")}
        className="fixed z-[2] w-[150px] lg:w-fit ml-[20px] vsm:ml-[40px] mt-[15px] vsm:mt-[30px]"
        src={logo}
        alt="logo"
      />
      <div className="relative hidden lg:block w-[54%] bg-[#0085FFF2] overflow-hidden">
        <img
          className="w-[65%] absolute bottom-0 left-1/2 -translate-x-1/2"
          src={authImg}
          alt="lady holding book"
        />
      </div>

      <div className="w-full mt-[-120px] vsm:mt-0 lg:w-fit lg:flex-1 bg-[#F2F9FF] flex flex-col items-center justify-center">
        <Link
          className="w-[90%] vsm:w-[85%] py-[30px] px-[10px] vsm:px-[30px] border-gray-600 border-t-[2px] border-b-[1px] flex items-center gap-[20px] text-[1.4rem] vsm:text-[1.8rem] xl:text-[2rem] font-semibold"
          to="/auth/student/login"
        >
          <StudentIcon className="text-[#2d7bbc]" />
          <p>Log In As A Student</p>
        </Link>
        <Link
          className="w-[90%] vsm:w-[85%] py-[30px] px-[10px] vsm:px-[30px] border-gray-600 border-t-[1px] border-b-[2px] flex items-center gap-[20px] text-[1.4rem] vsm:text-[1.8rem] xl:text-[2rem] font-semibold"
          to="/auth/tutor/login"
        >
          <TutorIcon className="text-[#2d7bbc]" />
          <p>Log In As A Tutor</p>
        </Link>
      </div>
    </div>
  );
};

export default SignInMode;
