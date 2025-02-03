import React, { use, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../../page/Home/home-page.tsx";
import Stack from "@mui/material/Stack";
import ResponsiveAppBar from "../appbar/app-bar-component.tsx";
import LoginForm from "../forms/loginForm/login-form.tsx";
function AppLayout() {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const handleLogin = (data: string) => {
    setUserName(data);
    setLogin(true); // เมื่อล็อกอินสำเร็จ ให้ค่า Login เป็น true
  };
  const handleLogOut = () => {
    setLogin(false); // เมื่อล็อกอินสำเร็จ ให้ค่า Login เป็น true
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
            element={login ? <HomePage /> : <LoginForm onLogin={handleLogin} />}
          />
        </Routes>
      </BrowserRouter>
    </Stack>
  );
}

export default AppLayout;
