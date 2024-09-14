import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./authContext";
import { fetchData } from "../utils/fetchData";
import { BASE_URL } from "../config";

const userContext = createContext();

const UserProvider = ({ children }) => {
  const { user } = useAuthContext();

  const [currAdmin, setCurrAdmin] = useState(() => {
    const saved = localStorage.getItem("currAdmin");
    return saved || "";
  });
  useEffect(() => {
    localStorage.setItem("currAdmin", currAdmin);
  }, [currAdmin]);
  // S for Student
  // T for Tutor
  // A for Admin

  const [profile, setProfile] = useState({ subject: "" });

  useEffect(() => {
    getBio();
  }, [user, currAdmin]);
  const getBio = () => {
    if (!user.token) {
      return;
    }

    if (currAdmin === "T") {
      fetchData(
        `${BASE_URL}/tutor/get-bio`,
        user.token
      )
        .then((res) => {
          setProfile(res);
        })
        .catch((err) => {
          console.log(err);
        });

      return;
    }

    if (currAdmin === "S") {
      fetchData(
        `${BASE_URL}/student/get-bio`,
        user.token
      )
        .then((res) => {
          setProfile(res);
        })
        .catch((err) => {
          console.log(err);
        });

      return;
    }
  };

  const [paymentDetails, setPaymentDetails] = useState({ month: "" });

  const [students, setStudents] = useState([]);
  useEffect(() => {
    getStudents();
  }, [user]);

  const getStudents = () => {
    fetchData(
      `${BASE_URL}/tutor/get-students`,
      user.token
    )
      .then((data) => {
        setStudents(data);
      })
      .catch((err) => console.error(err));
  };

  const [classes, setClasses] = useState([]);
  useEffect(() => {
    getClasses();
  }, []);
  const getClasses = () => {
    setClasses("loading");
    fetchData(
      `${BASE_URL}/student/schedule`,
      user.token
    )
      .then((res) => {
        setClasses(res);
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
        setClasses([]);
      });
  };

  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    getTutors();
  }, []);
  const getTutors = () => {
    setTutors("loading");
    fetchData(
      `${BASE_URL}/student/get-tutors/paid`,
      user.token
    )
      .then((res) => {
        setTutors(res);
      })
      .catch((err) => {
        console.log(err);
        setTutors([]);
      });
  };

  return (
    <userContext.Provider
      value={{
        profile,
        setProfile,
        currAdmin,
        setCurrAdmin,
        paymentDetails,
        setPaymentDetails,
        students,
        setStudents,
        getStudents,
        getBio,
        classes,
        setClasses,
        getClasses,
        tutors,
        getTutors,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => {
  return useContext(userContext);
};
