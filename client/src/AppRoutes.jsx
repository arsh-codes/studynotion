import { Route, Routes } from "react-router-dom";

import About from "@pages/About";
import AddCourse from "@pages/dashboard/AddCourse";
import ContactUs from "@pages/ContactUs";
import Earnings from "@pages/dashboard/Earnings";
import EnrolledCourses from "@pages/dashboard/EnrolledCourses";
import Error from "@pages/Error";
import ForgotPassword from "@pages/authentication/ForgotPassword";
import Home from "@pages/Home";
import Login from "@pages/authentication/Login";
import MyCourses from "@pages/dashboard/MyCourses";
import MyProfile from "@pages/dashboard/MyProfile";
import PurchaseHistory from "@pages/dashboard/PurchaseHistory";
import ResetPassword from "@pages/authentication/ResetPassword";
import Settings from "@pages/dashboard/Settings";
import Signup from "@pages/authentication/Signup";
import VerifyEmail from "@pages/authentication/VerifyEmail";
import Wishlist from "@pages/dashboard/Wishlist";

export default function AppRoutes() {
  return (
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
      <Route path="/dashboard/add-course" element={<AddCourse />} />
      <Route path="/dashboard/earnings" element={<Earnings />} />
      <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
      <Route path="/dashboard/my-courses" element={<MyCourses />} />
      <Route path="/dashboard/purchase-history" element={<PurchaseHistory />} />
      <Route path="/dashboard/settings" element={<Settings />} />
      <Route path="/dashboard/wishlist" element={<Wishlist />} />

      {/* 🚨 Catch-All Route (404) */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
