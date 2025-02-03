import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../../page/Home/home-page.tsx";
import Stack from "@mui/material/Stack";
import ResponsiveAppBar from "../appbar/app-bar-component.tsx";
import LoginForm from "../forms/loginForm/login-form.tsx";
import CheckInCheckOutPage from "../../page/CheeckInCheckOut/check-in-check-out-page.tsx";

function AppLayout() {
  const [login, setLogin] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");

  // ตรวจสอบสถานะการล็อกอินจาก localStorage
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedLoginStatus = localStorage.getItem("loginStatus");

    if (storedUserName && storedLoginStatus === "true") {
      setUserName(storedUserName);
      setLogin(true);
    }
  }, []);

  const handleLogin = (data: string) => {
    setUserName(data);
    setLogin(true);
    // เก็บข้อมูลใน localStorage
    localStorage.setItem("userName", data);
    localStorage.setItem("loginStatus", "true");
  };

  const handleLogOut = () => {
    setLogin(false);
    // ลบข้อมูลจาก localStorage เมื่อออกจากระบบ
    localStorage.removeItem("userName");
    localStorage.removeItem("loginStatus");
  };

  return (
    <Stack>
      <Stack>
        {login && (
          <ResponsiveAppBar userName={userName} onLogout={handleLogOut} />
        )}
      </Stack>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              localStorage.getItem("loginStatus") ? (
                <CheckInCheckOutPage userName={userName} basePath={""} />
              ) : (
                <LoginForm onLogin={handleLogin} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </Stack>
  );
}

export default AppLayout;
