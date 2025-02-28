import React, { useState } from "react";
import loginImage from "../assets/media/loginImage.webp";
import loginPageStrikeText from "../assets/media/loginPageStrikeText.svg";
import CtaButton from "../components/core/HomePage/CtaButton";
import { Link } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
export default function Login() {
  const [studentClicked, setstudentClicked] = useState(true);
  function handleStudentClick(event) {
    setstudentClicked(true);
    setInstructorClicked(false);
  }
  const [instructorClicked, setInstructorClicked] = useState(false);
  function handleInstructorClick(event) {
    setInstructorClicked(true);
    setstudentClicked(false);
  }
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  function handlePasswordVisibility(event) {
    setPasswordVisibility(!passwordVisibility);
  }
  const handleSubmitButton = (event) => {
    event.preventDefault();
    dispatchEvent(login(email, password, navigate));
    console.log(event.target);
  };

  return (
    // wrapper
    <div className="bg-richblack-900 text-richblack-5 relative flex h-screen w-screen flex-col select-none">
      {/*Section 1 Black background*/}
      <section className="mx-auto grid w-11/12 grid-cols-12 px-30 pt-16">
        {/* left text section */}
        {/* heading */}
        <section className="col-span-12 grid gap-9 place-self-start justify-self-start p-8 md:col-span-6">
          <div>
            <h1 className="text-3xl leading-9 font-semibold">Welcome Back</h1>
            <div>
              <span class="text-richblack-100 relative text-lg leading-relaxed font-normal">
                Build skills for today, tomorrow, and beyond.{" "}
                <img
                  className="absolute top-4 -right-10"
                  src={loginPageStrikeText}
                  alt="strike design"
                />
              </span>

              <span class="font-edu-sa-beginner font-bold text-blue-100">
                Education to future-proof your career.
              </span>
            </div>
          </div>
          {/* user type */}

          <div className="bg-richblack-700 flex w-fit gap-1 rounded-full p-1 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]">
            <input
              onClick={(event) => handleStudentClick(event)}
              className="appearance-none"
              type="radio"
              id="student"
              name="userType"
              value="student"
            />
            <label for="student">
              <div
                className={`active:bg-richblack-600 rounded-full px-4 py-1.5 ${studentClicked ? "bg-richblack-900" : "bg-richblack-700"}`}
              >
                Student
              </div>
            </label>
            <input
              onClick={(event) => handleInstructorClick(event)}
              className="appearance-none"
              type="radio"
              id="instructor"
              name="userType"
              value="instructor"
            />
            <label for="instructor">
              <div
                className={`active:bg-richblack-600 rounded-full px-4 py-1.5 ${instructorClicked ? "bg-richblack-900" : "bg-richblack-700"}`}
              >
                Instructor
              </div>
            </label>
          </div>
          {/* login form */}
          <form id="loginForm">
            <div className="flex flex-col gap-5">
              <section className="flex flex-col gap-1.5">
                <p>
                  Email Address
                  <span className="text-sm leading-snug text-pink-200"> *</span>
                </p>
                <input
                  type="email"
                  name="emailAddressLogin"
                  id="emailAddressLogin"
                  className="bg-richblack-700 overflow-hidden rounded-lg p-3 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]"
                  placeholder="Enter email address"
                />
              </section>
              <section className="relative flex flex-col gap-1.5">
                <p>
                  Password
                  <span className="text-sm leading-snug text-pink-200"> *</span>
                </p>
                <input
                  type={passwordVisibility ? "text" : "password"}
                  name="passwordLogin"
                  id="passwordLogin"
                  className="bg-richblack-700 relative overflow-hidden rounded-lg p-3 pr-16 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]"
                  placeholder="Enter password"
                />
                {passwordVisibility ? (
                  <BsEye
                    onClick={(event) => {
                      handlePasswordVisibility(event);
                    }}
                    className="absolute top-11.5 right-5 h-4.5 w-4.5"
                  />
                ) : (
                  <BsEyeSlash
                    onClick={(event) => {
                      handlePasswordVisibility(event);
                    }}
                    className="absolute top-11.5 right-5 h-4.5 w-4.5"
                  />
                )}

                <div className="text-right text-xs leading-tight text-blue-100">
                  <Link to="/forgot-password">
                    <p>Forgot Password</p>
                  </Link>
                </div>
              </section>
            </div>
            <button
              type="submit"
              form="loginForm"
              value="Submit"
              onClick={handleSubmitButton}
              className={
                "text-richblack-900 flex w-full cursor-pointer items-center justify-center rounded-lg bg-yellow-50 p-3 text-base font-medium shadow-md hover:bg-yellow-100"
              }
            >
              <p>Sign in</p>
            </button>
          </form>
          {/* login button */}
        </section>

        {/* right image section */}
        <section className="col-span-12 grid md:col-span-6">
          <img
            src={loginImage}
            className="max-h- place-self-center justify-self-end"
          />
        </section>
      </section>
    </div>
  );
}
