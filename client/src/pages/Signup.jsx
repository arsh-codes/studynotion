import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FormField from "../components/common/Form/FormField";
import PasswordField from "../components/common/Form/PasswordField";
import PhoneNumberInput from "../components/core/signupPage/PhoneNumberInput";
import React from "react";
import authPageStrikeText from "../assets/media/authPageStrikeText.svg";
import googleLogo from "../assets/media/googleLogo.svg";
import { sendOtp } from "../services/operations/authAPI";
import { setSignupData } from "../Redux/slices/authSlice";
import signupImage from "../assets/media/signupImage.jpg";
import toast from "react-hot-toast";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signupData = useSelector((state) => state.auth.signupData);

  function handleChange(event) {
    const { name, value } = event.target;
    dispatch(setSignupData({ [name]: value })); // Update Redux state
  }

  const handleSubmitButton = (event) => {
    event.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } =
      signupData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    dispatch(sendOtp(email));
    navigate("/verify-email");
  };

  return (
    <div className="bg-richblack-900 text-richblack-5 flex h-screen w-screen flex-col select-none">
      <section className="mx-auto grid w-11/12 grid-cols-12 px-6 pt-16">
        <section className="col-span-12 grid gap-9 p-8 md:col-span-6">
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

          {/* User Type Selector */}
          <div className="bg-richblack-700 flex w-fit gap-1 rounded-full p-1">
            {["student", "instructor"].map((type) => (
              <label key={type} htmlFor={type} className="cursor-pointer">
                <input
                  type="radio"
                  id={type}
                  name="accountType"
                  value={type}
                  checked={signupData.accountType === type}
                  onChange={handleChange}
                  className="hidden"
                />
                <div
                  className={`rounded-full px-4 py-1.5 ${signupData.accountType === type ? "bg-richblack-900" : "bg-richblack-700"}`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </div>
              </label>
            ))}
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmitButton}>
            <div className="flex flex-col gap-5">
              <section className="flex gap-4">
                <FormField
                  labelName="First Name"
                  inputType="text"
                  id="firstName"
                  placeholder="Enter first name"
                  required
                  name="firstName"
                  value={signupData.firstName}
                  onChange={handleChange}
                />
                <FormField
                  labelName="Last Name"
                  inputType="text"
                  id="lastName"
                  placeholder="Enter last name"
                  required
                  name="lastName"
                  value={signupData.lastName}
                  onChange={handleChange}
                />
              </section>

              <FormField
                labelName="Email Address"
                inputType="email"
                id="email"
                placeholder="Enter email address"
                required
                name="email"
                value={signupData.email}
                onChange={handleChange}
              />
              <PhoneNumberInput
                id="phoneNumber"
                placeholder="Enter phone number"
                required
                name="phoneNumber"
                value={signupData.phoneNumber}
                onChange={handleChange}
              />
              <PasswordField
                id="password"
                labelName="Password"
                placeholder="Enter password"
                required
                name="password"
                value={signupData.password}
                onChange={handleChange}
              />
              <PasswordField
                id="confirmPassword"
                labelName="Confirm Password"
                placeholder="Re-enter password"
                required
                name="confirmPassword"
                value={signupData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="text-richblack-900 w-full rounded-lg bg-yellow-50 p-3 text-base font-medium shadow-md hover:bg-yellow-100"
            >
              Sign Up
            </button>

            <div className="my-4 flex w-5/6 items-center">
              <hr className="flex-grow border-gray-500" />
              <span className="mx-2 text-sm text-gray-500">OR</span>
              <hr className="flex-grow border-gray-500" />
            </div>

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
