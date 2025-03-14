import { Navigate, Route, Routes } from "react-router-dom";

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
import PrivateRoute from "./components/PrivateRoute";
import PrivateRouteError from "@pages/PrivateRouteError";
import PurchaseHistory from "@pages/dashboard/PurchaseHistory";
import React from "react";
import ResetPassword from "@pages/authentication/ResetPassword";
import Settings from "@pages/dashboard/Settings";
import Signup from "@pages/authentication/Signup";
import VerifyEmail from "@pages/authentication/VerifyEmail";
import Wishlist from "@pages/dashboard/Wishlist";
import { useSelector } from "react-redux";

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

      {/* 🏠 Private Routes */}
      <Route
        path="/dashboard/my-profile"
        element={
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/add-course"
        element={
          <PrivateRoute>
            <AddCourse />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/earnings"
        element={
          <PrivateRoute>
            <Earnings />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/enrolled-courses"
        element={
          <PrivateRoute>
            <EnrolledCourses />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/my-courses"
        element={
          <PrivateRoute>
            <MyCourses />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/purchase-history"
        element={
          <PrivateRoute>
            <PurchaseHistory />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/wishlist"
        element={
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        }
      />

      {/* 🔐 Private Route Error */}
      <Route path="/private-error" element={<PrivateRouteError />} />

      {/* 🔴 Catch-All Route for Undefined Pages */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
