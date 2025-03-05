import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import FormField from "../components/common/Form/FormField";
import LongCTAButton from "../components/common/Form/LongCTAButton";
import PasswordField from "../components/common/Form/PasswordField";
import PhoneNumberInput from "../components/core/signupPage/PhoneNumberInput";
import authPageStrikeText from "../assets/media/authPageStrikeText.svg";
import googleLogo from "../assets/media/googleLogo.svg";
import { signup } from "../services/operations/authAPI";
import signupImage from "../assets/media/signupImage.jpg";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userType, setUserType] = useState("student");
  const [newPasswordVisibility, setNewPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);

  const [signupData, setSignupData] = useState({
    accountType: "",
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  
  // Handle form field changes
  function handleChange(event) {
    setSignupData((prevData) => ({ ...prevData, [event.name]: event.value }));
  }

  // Handle user type toggle
  function handleUserTypeChange(type) {
    setUserType(type);
  }

  // Handle form submission
  const handleSubmitButton = (event) => {
    event.preventDefault();

    if (
      !signupData.firstName ||
      !signupData.lastName ||
      !signupData.email ||
      !signupData.newPassword ||
      !signupData.confirmPassword
    ) {
      toast.error("All fields are required!");
      return;
    }

    if (signupData.newPassword !== signupData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    dispatch(signup(signupData.email, signupData.newPassword, navigate))
      .then(() => toast.success("Signup successful!"))
      .catch(() => toast.error("Signup failed. Please try again."));
  };

  return (
    <div className="bg-richblack-900 text-richblack-5 flex h-screen w-screen flex-col select-none">
      <section className="mx-auto grid w-11/12 grid-cols-12 px-6 pt-16">
        <section className="col-span-12 grid gap-9 p-8 md:col-span-6">
          <div>
            <h1 className="text-3xl font-semibold">Welcome Back</h1>
            <div>
              <span className="text-richblack-100 relative text-lg font-normal">
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

          {/* User Type Selector */}
          <div className="bg-richblack-700 flex w-fit gap-1 rounded-full p-1">
            <label htmlFor="student" className="cursor-pointer">
              <input
                type="radio"
                id="student"
                name="userType"
                value="student"
                checked={userType === "student"}
                onChange={() => handleUserTypeChange("student")}
                className="hidden"
              />
              <div
                className={`rounded-full px-4 py-1.5 ${userType === "student" ? "bg-richblack-900" : "bg-richblack-700"}`}
              >
                Student
              </div>
            </label>

            <label htmlFor="instructor" className="cursor-pointer">
              <input
                type="radio"
                id="instructor"
                name="userType"
                value="instructor"
                checked={userType === "instructor"}
                onChange={() => handleUserTypeChange("instructor")}
                className="hidden"
              />
              <div
                className={`rounded-full px-4 py-1.5 ${userType === "instructor" ? "bg-richblack-900" : "bg-richblack-700"}`}
              >
                Instructor
              </div>
            </label>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmitButton}>
            <div className="flex flex-col gap-5">
              {/* Name Fields */}
              <section className="flex gap-4">
                <FormField
                  labelName="First Name"
                  inputType="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter first name"
                  required
                  onChange={handleChange}
                />
                <FormField
                  labelName="Last Name"
                  inputType="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter last name"
                  required
                  onChange={handleChange}
                />
              </section>

              {/* Email Field */}
              <FormField
                labelName="Email Address"
                inputType="email"
                id="email"
                name="email"
                placeholder="Enter email address"
                required
                value={signupData.email}
                onChange={handleChange}
              />

              {/* Phone Number Input */}
              <PhoneNumberInput />

              {/* Password Fields */}
              <PasswordField
                id="newPassword"
                labelName="Password"
                name="newPassword"
                placeholder="Enter password"
                value={signupData.newPassword}
                onChange={handleChange}
                required
              />
              <PasswordField
                id="confirmPassword"
                labelName="Confirm Password"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={signupData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="text-richblack-900 w-full rounded-lg bg-yellow-50 p-3 text-base font-medium shadow-md hover:bg-yellow-100"
            >
              Sign Up
            </button>

            {/* OR Separator */}
            <div className="my-4 flex w-5/6 items-center">
              <hr className="flex-grow border-gray-500" />
              <span className="mx-2 text-sm text-gray-500">OR</span>
              <hr className="flex-grow border-gray-500" />
            </div>

            {/* Google Sign In */}
            <button
              className="w-5/6 rounded-lg border border-slate-700 bg-transparent p-2"
              aria-label="Sign in with Google"
            >
              <div className="flex justify-center gap-2">
                <img src={googleLogo} className="w-[5%]" alt="Google logo" />
                <span>Sign in with Google</span>
              </div>
            </button>
          </form>
        </section>

        {/* Signup Image */}
        <section className="col-span-12 md:col-span-6">
          <img
            src={signupImage}
            className="max-h-full place-self-center"
            alt="Signup Illustration"
          />
        </section>
      </section>
    </div>
  );
}
