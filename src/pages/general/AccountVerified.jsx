import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config";

const AccountVerified = () => {
  const [isVerified, setIsVerified] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getQueryParams = (query) => {
    return new URLSearchParams(query);
  };

  useEffect(() => {
    const queryParams = getQueryParams(location.search);
    const token = queryParams.get("token");
    console.log(token);

    setIsVerified(false);

    axios
      .get(
        `${BASE_URL}/auth/verify?token=${token}`
      )
      .then((res) => {
        console.log(res.data);
        setIsVerified(true);
      })
      .catch((err) => {
        console.log(err);
        setIsVerified(true);
      });
  }, []);

  return (
    <div className="h-screen w-full bg-[#F2F9FF]">
      <img
        onClick={() => navigate("/")}
        className="fixed z-[2] w-[150px] lg:w-fit ml-[20px] vsm:ml-[40px] mt-[15px] vsm:mt-[30px]"
        src={logo}
        alt="logo"
      />

      {isVerified ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-[40px]">
          <h1 className="text-[40px] font-semibold">Account Verified</h1>
          <Link
            className="bg-blue px-[20px] py-[10px] text-white font-medium text-[20px]"
            to="/"
          >
            Proceed to Login
          </Link>
        </div>
      ) : (
        <div className="h-full w-full grid place-items-center">
          <div className="size-[50px] border-l-[2px] border-r-[2px] border-blue rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default AccountVerified;
