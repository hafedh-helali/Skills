import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import About from "./pages/About";
import AnnualInterviews from "./annualinterview/AnnualInterviews";
import Interviews from "./interviews/interviews";
import Trainings from "./trainings/Trainings";
import Skills from "./skills/Skills";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="interviews" element={<Interviews />} />
        <Route path="annualinterviews" element={<AnnualInterviews />} />
        <Route path="trainings" element={<Trainings />} />
        <Route path="skills" element={<Skills />} />
        <Route path="about" element={<About />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="login" element={<Login />} />

        <Route index element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
