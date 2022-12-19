import React from "react";
import { Route, Routes } from "react-router-dom";
import { Country } from "../Country";
import { Department } from "../Department";
import { Employee } from "../Employee";
import { Home } from "../Home";
import { Register } from "../Components/Login/Register";

const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/department" element={<Department />} />
      <Route exact path="/country" element={<Country />} />
      <Route exact path="/employee" element={<Employee />} />
      <Route exact path="/register" element={<Register />} />
    </Routes>
  );
};
export default Router;
