import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/common/Navbar/Navbar";
import FloatingDevTool from "./pages/FloatingDevTool";

import Error from "./pages/Error";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";

export default function App() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Toaster />
      <Navbar />
      <FloatingDevTool />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Error />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </div>
  );
}
