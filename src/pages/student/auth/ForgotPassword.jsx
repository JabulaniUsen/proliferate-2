import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../../assets/logo.png";
import { useGlobalContext } from "../../../context/globalContext";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { setIsLoaderOpen, setModalErr } = useGlobalContext();

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email.toLowerCase());

    setIsLoaderOpen(true);
    axios
      .post(
        "https://formal-saloma-proliferate-41ba3b45.koyeb.app/api/v1/forgot-password/initiate",
        { email: email.toLowerCase() }
      )
      .then((res) => {
        console.log(res);
        toast.success("Token sent");
        navigate("/auth/reset-password");
        setIsLoaderOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setModalErr({
          title: "Error sending token",
          body: "Check if your email is accurate",
        });
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
        Forgot Password
      </h1>

      <div className="mt-[40px]">
        <div className="auth-page auth-page-2 font-Montserrat shadow-custom">
          <p className="font-Montserrat text-[18px] text-center leading-[1.1]">
            <span className="font-bold">Instructions:</span> <br /> Enter the
            email address associated with your account.{" "}
            <br className="hidden md:block" /> We'll send you a token to reset
            your password.
          </p>

          <div className="form my-[30px] h-[200px] flex flex-col items-center gap-[20px]">
            <div>
              <label htmlFor="mail">
                Email Address <span className="text-[red]">*</span>
              </label>
              <input
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                type="mail"
                id="mail"
                name="mail"
              />
            </div>
          </div>
        </div>

        <div className="auth-page mt-[60px] flex justify-end items-center shadow-custom2 font-Montserrat">
          <button
            type="submit"
            className="flex gap-[15px] items-center bg-blue text-white rounded-[8px] px-[30px] py-[8px] font-bold"
          >
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
