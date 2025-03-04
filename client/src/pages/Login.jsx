import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import FormField from "../components/common/Form/FormField";
import LongCTAButton from "../components/common/Form/LongCTAButton";
import PasswordField from "../components/common/Form/PasswordField";
import authPageStrikeText from "../assets/media/authPageStrikeText.svg";
import { login } from "../services/operations/authAPI";
import loginImage from "../assets/media/loginImage.webp";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate(); // Initialize navigate

  const [userType, setUserType] = useState("student");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleUserTypeChange(type) {
    setUserType(type);
  }

  function togglePasswordVisibility() {
    setPasswordVisibility(!passwordVisibility);
  }

  const handleSubmitButton = (event) => {
    event.preventDefault();
    dispatch(login(email, password, navigate)); // Use dispatch properly
    console.log("Login Attempted:", { email, password, userType });
  };

  return (
    <div className="bg-richblack-900 text-richblack-5 relative flex h-screen w-screen flex-col select-none">
      <section className="mx-auto grid w-11/12 grid-cols-12 px-6 pt-16">
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

          <div className="bg-richblack-700 flex w-fit gap-1 rounded-full p-1 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]">
            <input
              type="radio"
              id="student"
              name="userType"
              value="student"
              checked={userType === "student"}
              onChange={() => handleUserTypeChange("student")}
              className="hidden"
            />
            <label htmlFor="student">
              <div
                className={`cursor-pointer rounded-full px-4 py-1.5 ${userType === "student" ? "bg-richblack-900" : "bg-richblack-700"}`}
              >
                Student
              </div>
            </label>

            <input
              type="radio"
              id="instructor"
              name="userType"
              value="instructor"
              checked={userType === "instructor"}
              onChange={() => handleUserTypeChange("instructor")}
              className="hidden"
            />
            <label htmlFor="instructor">
              <div
                className={`cursor-pointer rounded-full px-4 py-1.5 ${userType === "instructor" ? "bg-richblack-900" : "bg-richblack-700"}`}
              >
                Instructor
              </div>
            </label>
          </div>

          <form id="loginForm" onSubmit={handleSubmitButton}>
            <div className="flex flex-col gap-5">
              <FormField
                labelName="Email Address"
                inputType="email"
                id="emailAddressLogin"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />

              <section className="relative flex flex-col gap-1.5">
                <PasswordField
                  id="passwordLogin"
                  labelName="Password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={true}
                />

                <div className="text-right text-xs leading-tight text-blue-100">
                  <Link to="/forgot-password">
                    <p>Forgot Password?</p>
                  </Link>
                </div>
              </section>
            </div>

            <LongCTAButton type="submit">Login</LongCTAButton>
          </form>
        </section>

        <section className="col-span-12 grid md:col-span-6">
          <img
            src={loginImage}
            className="max-h-full place-self-center justify-self-end"
            alt="Login Illustration"
          />
        </section>
      </section>
    </div>
  );
}
