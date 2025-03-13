import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import authPageStrikeText from "@assets/media/authPageStrikeText.svg";
import { login } from "@services/operations/authAPI";
import loginInstructor from "@assets/media/loginInstructor.jpg";
import loginStudent from "@assets/media/loginStudent.webp";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function Login() {
  const dispatch = useDispatch(); // Initialize Redux dispatch
  const navigate = useNavigate(); // Hook for navigation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // React Hook Form setup with error handling
  const [accountType, setAccountType] = useState("student"); // State for account type selection
  const { isLoggedIn } = useSelector((state) => state.auth);
  function handleAccountTypeChange(type) {
    setAccountType(type);
  }

  const onSubmit = (data) => {
    if (!data.email || !data.password) {
      return; // Prevent submission if fields are empty
    }
    dispatch(login(data.email, data.password, navigate)) // Dispatch login action
      .catch((error) => console.error("Login failed:", error)); // Handle login errors
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard/my-profile");
    }
  }, [isLoggedIn, navigate]); // Runs when `isLoggedIn` changes
  return (
    <div className="bg-richblack-900 text-richblack-5 relative flex h-screen w-screen flex-col select-none">
      <section className="mx-auto grid w-11/12 grid-cols-12 px-6 pt-16">
        {/* Left Section - Login Form */}
        <section className="col-span-12 grid gap-9 place-self-start justify-self-start p-8 md:col-span-6">
          <div>
            <h1 className="text-3xl leading-9 font-semibold">Welcome Back</h1>
            <div>
              <span className="text-richblack-100 relative text-lg leading-relaxed font-normal">
                Build skills for today, tomorrow, and beyond.
                <img
                  className="absolute top-4 -right-10"
                  src={authPageStrikeText}
                  alt="strike design"
                />
              </span>
              <span className="font-edu-sa-beginner font-bold text-blue-100">
                Education to future-proof your career.
              </span>
            </div>
          </div>

          {/* Account Type Selection */}
          <div className="bg-richblack-700 flex w-fit gap-1 rounded-full p-1 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]">
            <button
              className={`cursor-pointer rounded-full px-4 py-1.5 ${accountType === "student" ? "bg-richblack-900" : "bg-richblack-700"}`}
              onClick={() => handleAccountTypeChange("student")}
            >
              Student
            </button>
            <button
              className={`cursor-pointer rounded-full px-4 py-1.5 ${accountType === "instructor" ? "bg-richblack-900" : "bg-richblack-700"}`}
              onClick={() => handleAccountTypeChange("instructor")}
            >
              Instructor
            </button>
          </div>

          {/* Login Form */}
          <form
            id="loginForm"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-5">
              {/* Email Input */}
              <label className="text-sm font-medium">Email Address</label>
              <input
                type="email"
                placeholder="Enter email address"
                {...register("email", { required: "Email is required" })}
                className="bg-richblack-800 rounded p-2 text-white"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}

              {/* Password Input */}
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                {...register("password", { required: "Password is required" })}
                className="bg-richblack-800 rounded p-2 text-white"
              />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}

              {/* Forgot Password Link */}
              <div className="text-right text-xs leading-tight text-blue-100">
                <Link to="/forgot-password">
                  <p>Forgot Password?</p>
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white"
            >
              Login
            </button>
          </form>
        </section>

        {/* Right Section - Image */}
        <section className="col-span-12 grid md:col-span-6">
          <img
            src={accountType === "student" ? loginStudent : loginInstructor}
            className="max-h-full place-self-center justify-self-end"
            alt="Login Illustration"
          />
        </section>
      </section>
    </div>
  );
}
