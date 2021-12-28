import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Login, Register } from "./components";
import Home from "./container/Home";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const User =
      localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.clear();

    if (!User) navigate("/login");
  }, []);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default App;
