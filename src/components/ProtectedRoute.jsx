import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

const ProtectedRoute = () => {
  const { user } = useAuthContext();

  const handleSignIn = () => {
    alert("You need to login");
  };

  return user.token ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/auth/student/login" />
      {handleSignIn()}
    </>
  );
};

export default ProtectedRoute;
