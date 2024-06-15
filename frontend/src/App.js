import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Authentication/Login";
import Registration from "./components/Authentication/Registration";
import AfterUserLogin from "./components/complaints/AfterUserLogin";
import ComplaintForm from "./components/complaints/ComplaintForm";
import ChatProvider from "./context/ChatProvider";
import Admin from "./components/Authentication/AdminLogin";
import AdminDashboard from "./components/Admin/adminDashboard";


const App = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const admin = JSON.parse(localStorage.getItem("adminInfo"));

  useEffect(() => {
    const path = window.location.pathname;
    if (!admin && path.startsWith("/admindashboard")) {
      navigate("/adminlogin");
    } else if ((user && path === "/") || (user && path === "/signup")) {
      navigate("/usercomplaints");
    }
  }, [admin, user, navigate]);

  return (
    <div>
      <ChatProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route
            path="/usercomplaints"
            element={user ? <AfterUserLogin /> : <Login />}
          />
          <Route
            path="/registerComplain"
            element={user ? <ComplaintForm /> : <Login />}
          />
          <Route path="/adminlogin" element={<Admin />} />
          <Route
            path="/admindashboard"
            element={admin ? <AdminDashboard /> : <Admin />}
          />
        </Routes>
      </ChatProvider>
    </div>
  );
};

export default App;
