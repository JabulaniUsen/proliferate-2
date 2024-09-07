import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../../assets/logo.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useGlobalContext } from "../../../context/globalContext";
import axios from "axios";
import { validatePassword } from "../../../utils/validatePassword";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { setIsLoaderOpen } = useGlobalContext();

  const [isError, setIsError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [formData, setFormData] = useState({
    token: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (
      formData.confirmPassword != "" &&
      formData.newPassword != "" &&
      formData.confirmPassword !== formData.newPassword
    ) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [formData]);

  useEffect(() => {
    if (formData.newPassword != "") {
      const isPasswordValid = validatePassword(formData.newPassword);
      if (!isPasswordValid) {
        setIsPasswordError(true);
        return;
      } else {
        setIsPasswordError(false);
      }
    } else {
      setIsPasswordError(false);
    }
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.token == "" && formData.newPassword == "") {
      toast.error("Enter your values");
      return;
    }

    setIsLoaderOpen(true);
    console.log(formData);
    axios
      .post(
        "https://formal-saloma-proliferate-41ba3b45.koyeb.app/api/v1/forgot-password/reset",
        {
          token: formData.token,
          newPassword: formData.newPassword,
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("Password reset done", { autoClose: 5000 });
        navigate("/");
        setIsLoaderOpen(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error");
        setIsLoaderOpen(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="py-[10px] px-[20px] sm:px-[60px] lg:px-[80px]"
    >
      <Link to="/">
        <img className="w-[150px] lg:w-fit" src={logo} alt="logo" />
      </Link>
      <h1 className="mt-[20px] md:mt-0 mb-[20px] text-[32px] font-bold font-Montserrat text-center">
        Reset Password
      </h1>

      <div className="mt-[40px]">
        <div className="auth-page auth-page-2 font-Montserrat shadow-custom">
          <p className="font-Montserrat text-center leading-[1.1]">
            <span className="font-bold">Instructions:</span> <br /> Enter the
            token sent to your mail. <br className="hidden md:block" /> Set a
            new password.
          </p>

          <div className="form my-[30px] h-fit flex flex-col items-center gap-[20px]">
            <div>
              <label htmlFor="token">
                Token: <span className="text-[red]">*</span>
              </label>
              <input
                type="text"
                value={formData.token}
                onChange={handleChange}
                id="token"
                name="token"
                spellCheck="false"
              />
            </div>

            <div>
              <label htmlFor="newPassword">
                New Password: <span className="text-[red]">*</span>
              </label>
              <div className="relative">
                <input
                  style={{
                    border: isError && "1px solid red",
                    outline: isError && "none",
                  }}
                  type={!showPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={handleChange}
                  id="newPassword"
                  name="newPassword"
                  spellCheck="false"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-[10px] top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <IoEyeOff /> : <IoEye />}
                </button>
              </div>
              {isPasswordError && (
                <p className="text-[12px] text-[red] leading-[1.1]">
                  At least 8 characters and at least a uppercase letter,
                  lowercase letter, number and symbol
                </p>
              )}
              {isError && (
                <p className="text-[13px] text-[red]">
                  Password doeesn't match
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword">
                Confirm New Password: <span className="text-[red]">*</span>
              </label>
              <div className="relative">
                <input
                  style={{
                    border: isError && "1px solid red",
                    outline: isError && "none",
                  }}
                  type={!showPassword2 ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  id="confirmPassword"
                  name="confirmPassword"
                  spellCheck="false"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword2((prev) => !prev)}
                  className="absolute right-[10px] top-1/2 -translate-y-1/2"
                >
                  {showPassword2 ? <IoEyeOff /> : <IoEye />}
                </button>
              </div>
              {isError && (
                <p className="text-[13px] text-[red]">
                  Password doeesn't match
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="auth-page mt-[60px] flex justify-end items-center shadow-custom2 font-Montserrat">
          <button
            onClick={handleSubmit}
            className="flex gap-[15px] items-center bg-blue text-white rounded-[8px] px-[30px] py-[8px] font-bold"
          >
            Set New Password
          </button>
        </div>
      </div>
    </form>
  );
};

export default ResetPassword;
