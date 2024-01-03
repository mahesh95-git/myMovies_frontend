import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminProtected() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user); // Assuming the state structure has a user object

  if (user.role === "admin") {
    return <Outlet/>;
  } else {
    navigate("/");
    return null; // Return null or a component for unauthorized access
  }
}

export default AdminProtected;
