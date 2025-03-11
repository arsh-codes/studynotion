// ✅ React Router
import { Route, Routes } from "react-router";

import About from "@/pages/About";
import ContactUs from "@/pages/ContactUs";
import Error from "@/pages/Error";
import FloatingDevTool from "@/components/common/FloatingDevTool";
import ForgotPassword from "@/pages/authentication/ForgotPassword";
// ✅ Pages
import Home from "@/pages/Home";
// ✅ Authentication Pages
import Login from "@/pages/authentication/Login";
import MyProfile from "@/pages/MyProfile";
// ✅ Common Components
import Navbar from "@/components/common/Navbar/Navbar";
import ResetPassword from "@/pages/authentication/ResetPassword";
import Signup from "@/pages/authentication/Signup";
import { Toaster } from "react-hot-toast";
import VerifyEmail from "@/pages/authentication/VerifyEmail";

export default function App() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* ✅ Notifications */}
      <Toaster />

      {/* ✅ Navbar */}
      <Navbar />
      <FloatingDevTool />

      {/* ✅ App Routes */}
      <Routes>
        {/* 🌟 Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* 🔐 Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* 🏠 Dashboard Routes */}
        <Route path="/dashboard/my-profile" element={<MyProfile />} />

        {/* 🚨 Catch-All Route (404) */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}
