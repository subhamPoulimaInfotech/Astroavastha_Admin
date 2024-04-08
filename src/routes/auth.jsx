import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/admin/Login";

export default function Auth() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
    </>
  );
}
