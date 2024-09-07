import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./globalContext";
import { BASE_URL } from "../config";
const authContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const { setIsLoaderOpen, setModalErr } = useGlobalContext();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : {};
  });
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const logout = () => {
    setUser({});

    axios
      .post(
        `${BASE_URL}/auth/logout`,
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/");
  };

  //Student
  const [formData, setFormData] = useState({
    //Personal Info
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    contactNumber: "",
    gender: "",
    age: "",
    //Academic Details
    gradeYear: "",
    subjectsNeedingTutoring: [],
    attendanceType: "",
    currentLocation: "",
    preferredTime: "",
    //Preferences
    availability: [],
    additionalPreferences: "",
    requirements: "",
    communicationLanguage: "english",
    //Learning Goals
    shortTermGoals: "",
    longTermGoals: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (onSelected) onSelected(target.value);
  };
  
  const checkFormData = (data) => {
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      contactNumber,
      gender,
      age,
      gradeYear,
      subjectsNeedingTutoring,
      attendanceType,
      currentLocation,
      availability,
    } = data;
    const fieldsToCheck = [
      firstName,
      lastName,
      userName,
      email,
      password,
      contactNumber,
      gender,
      age,
      gradeYear,
      subjectsNeedingTutoring,
      attendanceType,
      currentLocation,
      availability,
    ];

    const isAnyFieldFalse = fieldsToCheck.some((value) => !value);
    return isAnyFieldFalse ? true : false;
  };
  const registerUser = async () => {
    console.log(formData);
    
    const newForm = {
      age: Number(formData.age),
      ...formData,
      subjectsNeedingTutoring: formData.subjectsNeedingTutoring
        .map((option) => option.value)
        .join(","),
      availability: formData.availability
        .map((option) => option.value)
        .join(","),
    };

    const isAnyFieldEmpty = checkFormData(newForm);
    if (isAnyFieldEmpty) {
      setModalErr({
        title: "Missing Fields",
        body: "Please fill the appropriate fields before signing up",
      });
      return;
    }

    setIsLoaderOpen(true);
    try {
      // First API call
      const personalRes = await axios.post(
        `${BASE_URL}/auth/studentPersonalDetails`,
        {
          firstName: newForm.firstName.trim(),
          lastName: newForm.lastName.trim(),
          userName: newForm.userName.trim(),
          email: newForm.email.toLowerCase().trim(),
          password: newForm.password.trim(),
          contactNumber: newForm.contactNumber.trim(),
          gender: newForm.gender.trim(),
          age: Number(newForm.age),
        }
      );
      console.log(personalRes.data);
      const token = personalRes.data.body.token;
      setUser({ token });

      // Second API call
      const academicRes = await axios.post(
        `${BASE_URL}/auth/academicDetail`,
        {
          gradeYear: newForm.gradeYear,
          subjectsNeedingTutoring: newForm.subjectsNeedingTutoring,
          attendanceType: newForm.attendanceType,
          currentLocation: newForm.currentLocation,
          preferredTime: newForm.preferredTime,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Third API call
      const preferencesRes = await axios.post(
        `${BASE_URL}/auth/preferences`,
        {
          availability: newForm.availability,
          additionalPreferences: newForm.additionalPreferences,
          requirements: newForm.requirements,
          communicationLanguage: newForm.communicationLanguage,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Fourth API call
      const learningGoalsRes = await axios.post(
        `${BASE_URL}/auth/learningGoals`,
        {
          shortTermGoals: newForm.shortTermGoals,
          longTermGoals: newForm.longTermGoals,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Final API call
      const finalRes = await axios.post(
        `${BASE_URL}/auth/student-completeRegistration`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Registration completed");
      setIsLoaderOpen(false);
      navigate("/auth/student/login");
      setModalErr({
        title: "Welcome To Proliferate",
        body: "A confirmation email has been sent to you to verify your account",
      });
    } catch (err) {
      console.error(err);
      setModalErr({
        title: "Error creating account",
        body: err.response.data,
      });
      setIsLoaderOpen(false);
    }
  };

  //Tutor
  const handleTutorChange = (e) => {
    const { name, value } = e.target;
    setTutorFormData({ ...tutorFormData, [name]: value });
  };
  const [tutorFormData, setTutorFormData] = useState({
    //Personal Info
    tutorId: "",
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    contactNumber: "",
    gender: "",
    age: "",
    //Education and Experience
    highestEducationLevelAttained: "",
    majorFieldOfStudy: "",
    yearsOfExperience: "",
    teachingGrade: "",
    currentSchool: "",
    location: "",
    //Teaching style and approach
    teachingStyle: "",
    approachToTutoring: "",
    attendanceType: "",
    //Availability and Preference
    preferredSubjects: [],
    weeklyAvailability: "",
    timeslotAvailability: "",
    selectTimezone: "",
    communicationLanguage: "",
    //UploadDocuments
    educationalCertificates: null,
    resumeCurriculumVitae: null,
    professionalDevelopmentCert: null,
    identificationDocuments: null,
    termsAndConditionsApproved: false,
    registrationCompleted: false,
  });
  const registerTutor = async () => {
    setIsLoaderOpen(true);

    try {
      // First API call
      const personalRes = await axios.post(
        `${BASE_URL}/authorize/tutorPersonalDetails`,
        {
          firstName: tutorFormData.firstName,
          lastName: tutorFormData.lastName,
          userName: tutorFormData.email,
          email: tutorFormData.email.toLowerCase(),
          password: tutorFormData.password,
          contactNumber: tutorFormData.contactNumber,
          gender: tutorFormData.gender,
          age: Number(tutorFormData.age),
        }
      );
      console.log(personalRes.data);
      const token = personalRes.data.body.token;
      setUser({ token });

      // Second API call
      const educationRes = await axios.post(
        `${BASE_URL}/authorize/educationExperience`,
        {
          highestEducationLevelAttained:
            tutorFormData.highestEducationLevelAttained,
          majorFieldOfStudy: tutorFormData.majorFieldOfStudy,
          yearsOfExperience: tutorFormData.yearsOfExperience,
          teachingGrade: tutorFormData.teachingGrade,
          currentSchool: tutorFormData.currentSchool,
          location: tutorFormData.location,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Third API call
      const teachingRes = await axios.post(
        `${BASE_URL}/authorize/teachingStyleApproach`,
        {
          teachingStyle: tutorFormData.teachingStyle,
          approachToTutoring: tutorFormData.approachToTutoring,
          attendanceType: tutorFormData.attendanceType,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Fourth API call
      const availabilityRes = await axios.post(
        `${BASE_URL}/authorize/availabilityPreference`,
        {
          preferredSubjects: tutorFormData.preferredSubjects.map(
            (option) => option.value
          ),
          weeklyAvailability: tutorFormData.weeklyAvailability
            .map((option) => option.value)
            .join(","),
          timeslotAvailability: tutorFormData.timeslotAvailability
            .map((option) => option.value)
            .join(","),
          selectTimezone: tutorFormData.selectTimezone,
          communicationLanguage: tutorFormData.communicationLanguage,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // fifth API call
      const payload = new FormData();
      payload.append(
        "educationalCertificates",
        tutorFormData.educationalCertificates
      );
      payload.append(
        "resumeCurriculumVitae",
        tutorFormData.resumeCurriculumVitae
      );
      payload.append(
        "professionalDevelopmentCert",
        tutorFormData.professionalDevelopmentCert
      );
      payload.append(
        "identificationDocuments",
        tutorFormData.identificationDocuments
      );
      const uploadDocRes = await axios.post(
        `${BASE_URL}/authorize/upload-documents`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Final API call
      const finalRes = await axios.post(
        `${BASE_URL}/authorize/tutorCompleteRegistration`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Registration completed");

      setIsLoaderOpen(false);
      navigate("/auth/tutor/login");
      setModalErr({
        title: "Welcome To Proliferate",
        body: "A confirmation email has been sent to you to verify your account",
      });
    } catch (err) {
      console.error(err);
      setModalErr({
        title: "Error creating account",
      });
      setIsLoaderOpen(false);
    }
  };

  return (
    <authContext.Provider
      value={{
        user,
        setUser,
        logout,
        formData,
        setFormData,
        tutorFormData,
        setTutorFormData,
        handleChange,
        handleTutorChange,
        registerUser,
        registerTutor,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => {
  return useContext(authContext);
};
