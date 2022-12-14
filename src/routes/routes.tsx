import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoutes from "../components/ProtectedRoutes";
import DashboardPage from "../pages/DashboardPage";
import ContactPage from "../pages/ContactPage";
import AboutPage from "../pages/AboutPage";

export default () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route element={<ProtectedRoutes />}>
      <Route path="/dashboard" element={<DashboardPage />} />
    </Route>
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);
