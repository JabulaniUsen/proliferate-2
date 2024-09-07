import React, { useEffect, useState } from "react";
import { MdArrowForwardIos as Arrow } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useAuthContext } from "../../../context/authContext";
import { validatePassword } from "../../../utils/validatePassword";
import axios from "axios";
import { useGlobalContext } from "../../../context/globalContext";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { BASE_URL } from "../../../config";

const PersonalInfo = () => {
  const navigate = useNavigate();
  const { formData, handleChange, setFormData } = useAuthContext();
  const { setIsLoaderOpen, setModalErr } = useGlobalContext();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const checkAvailability = async () => {
    setIsLoaderOpen(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/auth/check-student/${formData.userName}/${formData.email}`
      );
      console.log('Response', res);
      
      setIsLoaderOpen(false);
      return res.data
    } catch (err) {
      console.log("sorry something went wrong", err);
      setIsLoaderOpen(false);
    }
  };

  useEffect(() => {
    setPasswordError(false);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isPasswordValid = validatePassword(formData.password);
    if (!isPasswordValid) {
        setPasswordError(true);
        return;
    }

    try {
        const res = await checkAvailability();
        console.log(res);
        if (res && !res.userName && !res.email) {
          navigate("/auth/student/register/academic-details");
        } else {
            setModalErr({
                title: `Already existing detail`,
                body: `${
                    res?.userName && res?.email
                        ? "Username and email"
                        : res?.userName
                        ? "Username"
                        : "Email"
                } already exist, please pick another`,
            });
        }
    } catch (error) {
        console.error("Error in handleSubmit:", error);
        setModalErr({
            title: "Network Error",
            body: "Unable to complete the request. Please try again later."
        });
    }
};


  return (
    <form onSubmit={handleSubmit}>
      <div className="auth-page auth-page-1 font-Montserrat shadow-custom">
        <p className="text-[18px] font-Opensans text-center font-medium">
          Please provide your full name, email address, contact number, gender
          and age.
          <br className="hidden md:block" /> Ensure that the information is
          accurate and up-to-date.
        </p>

        <div className="form my-[30px] flex flex-wrap xl:grid grid-cols-3 xl:justify-between gap-y-[30px] gap-[20px]">
          <div>
            <label htmlFor="firstName">
              First Name: <span className="text-[red]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={handleChange}
              id="firstName"
              name="firstName"
              placeholder="First Name"
              spellCheck="false"
            />
          </div>

          <div>
            <label htmlFor="lastName">
              Last Name: <span className="text-[red]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={handleChange}
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              spellCheck="false"
            />
          </div>

          <div>
            <label htmlFor="email">
              Email Address: <span className="text-[red]">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              id="email"
              name="email"
              placeholder="Enter your email address"
              spellCheck="false"
            />
          </div>

          <div>
            <label htmlFor="userName">
              User Name: <span className="text-[red]">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.userName}
              onChange={(e) => {
                handleChange(e);
              }}
              id="userName"
              name="userName"
              placeholder="User Name"
              spellCheck="false"
            />
          </div>

          <div className="w-full">
            <label htmlFor="password">
              Password: <span className="text-[red]">*</span>
            </label>
            <div className="relative w-full">
              <input
                style={{
                  border: passwordError && "1px solid red",
                }}
                type={!showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                id="password"
                name="password"
                spellCheck="false"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-[10px] top-1/2 -translate-y-1/2"
              >
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </button>

              {passwordError && (
                <div className="absolute bottom-[-27px] left-0 w-full h-fit">
                  <p className="text-[12px] text-[red] leading-[1.1]">
                    At least 8 characters and at least a uppercase letter,
                    lowercase letter, number and symbol
                  </p>
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="contactNumber">
              Contact Number: <span className="text-[red]">*</span>
            </label>
            {/* <input
              type="number"
              required
              value={formData.contactNumber}
              onChange={handleChange}
              id="contactNumber"
              name="contactNumber"
              placeholder="Enter your contact number"
            /> */}
            <PhoneInput
              placeholder="Enter your contact number"
              required
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e })}
              id="contactNumber"
              name="contactNumber"
            />
          </div>

          <div>
            <label htmlFor="gender">
              Gender: <span className="text-[red]">*</span>
            </label>

            <select
              className="bg-white"
              value={formData.gender}
              onChange={handleChange}
              name="gender"
              id="gender"
              required
            >
              <option value=""></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label htmlFor="age">
              Age: <span className="text-[red]">*</span>
            </label>
            <input
              type="number"
              required
              value={formData.age}
              onChange={handleChange}
              id="age"
              name="age"
              placeholder="Enter your age"
            />
          </div>
        </div>
      </div>

      <div className="auth-page mt-[60px] flex justify-end items-center shadow-custom2 font-Montserrat">
        <button
          type="submit"
          className="flex gap-[15px] items-center bg-blue text-white rounded-[8px] px-[30px] py-[8px] font-bold"
        >
          <p>Next</p>
          <Arrow />
        </button>
      </div>
    </form>
  );
};

export default PersonalInfo;
