import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authImg from "../../../assets/authImg.png";
import logo from "../../../assets/logo.png";
import { FaFacebook, FaLinkedin } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoMdInformationCircle as ErrorIcon } from "react-icons/io";
import { IoEye, IoEyeOff } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../../context/globalContext";
import { useAuthContext } from "../../../context/authContext";
import { useUser } from "../../../context/userContext";
import { BASE_URL } from "../../../config";

const TutorLogin = () => {
  const { setIsLoaderOpen, setModalErr } = useGlobalContext();
  const { setUser } = useAuthContext();
  const { setCurrAdmin } = useUser();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoaderOpen(true);

    axios
      .post(
        `${BASE_URL}/authorize/login-tutor`,
        {
          email: formData.email.toLowerCase(),
          password: formData.password,
        }
      )
      .then((res) => {
        console.log(res.data);
        const { token, tutorDto } = res?.data;

        setIsLoaderOpen(false);
        setUser({ token, ...tutorDto });
        setCurrAdmin("T");

        if (res.data.hasBio) {
          toast.success("Welcome Back!");
          navigate("/tutor/settings/profile");
        } else {
          toast("Please Update your bio");
          navigate("/tutor/settings/account");
        }
      })
      .catch((err) => {
        console.log(err);

        setModalErr({
          title: "Incorrect Details",
          body: "Please enter the correct email and password",
        });
        setIsError(true);
        setIsLoaderOpen(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

      <div className="vsm:pt-[70px] lg:mt-0 w-full lg:w-fit lg:flex-1 bg-[#F2F9FF] flex vsm:items-center justify-center">
        <div className="px-[20px] vsm:px-0 w-full vsm:w-[80%] md:w-fit flex flex-col items-center justify-center">
          <h1 className="text-[25px] text-center vsm:text-[27px] md:text-[32px] font-bold">
            LOGIN YOUR ACCOUNT
          </h1>

          <form
            onSubmit={handleSubmit}
            className="w-full mt-[40px] lg:mt-[50px] 2xl:mt-[80px] flex flex-col gap-[20px]"
          >
            <label className="text-[20px] 2xl:text-[24px] font-bold">
              Email:
              <div
                className={`${
                  isError && "border-[#EB5757]"
                } w-full relative  rounded-[8px] border border-[#CCCCCC] overflow-hidden`}
              >
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="p-[16px] w-full outline-none text-base font-normal block"
                  placeholder="Enter your email"
                  spellCheck="false"
                />
                {isError && (
                  <ErrorIcon className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[#EB5757]" />
                )}
              </div>
              {isError && (
                <p className="text-base font-normal font-Opensans text-[#EB5757]">
                  Wrong email
                </p>
              )}
            </label>

            <label className="text-[20px] 2xl:text-[24px] font-bold">
              Password:
              <div
                className={`${
                  isError && "border-[#EB5757]"
                } w-full relative  rounded-[8px] border border-[#CCCCCC] overflow-hidden`}
              >
                <input
                  type={!showPassword ? "text" : "password"}
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="p-[16px] w-full outline-none text-base font-normal block"
                  placeholder="Enter your password"
                  spellCheck="false"
                />
                {isError ? (
                  <ErrorIcon className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[#EB5757]" />
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-[10px] top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <IoEyeOff /> : <IoEye />}
                  </button>
                )}
              </div>
              {isError && (
                <p className="text-base font-normal font-Opensans text-[#EB5757]">
                  Wrong password
                </p>
              )}
            </label>

            <div className="mt-[40px]">
              <div className="flex items-center justify-center gap-[10px]">
                <button
                  type="submit"
                  className="px-[20px] py-[10px] rounded-[15px] bg-blue text-white font-bold"
                >
                  Login
                </button>
                <Link
                  to="/auth/tutor/register"
                  className="px-[20px] py-[10px] rounded-[15px] bg-[#DE4B18] text-white font-bold"
                >
                  Register
                </Link>
              </div>
              <Link
                to="/auth/forgot-password"
                className="block mx-auto text-center text-[#969696] font-semibold underline"
              >
                Forgot your password?
              </Link>
            </div>
          </form>

          <div className="mt-[30px]">
            <p className="font-bold text-center">Sign in with</p>
            <span className="mt-[5px] flex gap-x-[70px] justify-center items-center text-[20px]">
              <a href="#" target="blank">
                <FaFacebook color="#0085FF" />
              </a>
              <a href="#" target="blank">
                <FcGoogle />
              </a>
              <a href="#" target="blank">
                <FaLinkedin color="#0085FF" />
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorLogin;
