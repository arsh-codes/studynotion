import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { BsArrowLeft } from "react-icons/bs";
import { FaClockRotateLeft } from "react-icons/fa6";
import LongCTAButton from "../components/common/Form/LongCTAButton";
import OtpInput from "react-otp-input";
import { sendOtp } from "../services/operations/authAPI";
import { useSelector } from "react-redux";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const { signupData } = useSelector((state) => state.auth);
  const {
    accountType,
    firstName,
    lastName,
    email,
    countryCode,
    phoneNumber,
    password,
    confirmPassword,
  } = signupData;

  // need these
  //   accountType,
  //   firstName,
  //   lastName,
  //   countryCode,
  //   email,
  //   password,
  //   confirmPassword,
  //   otp,
  //   navigate,

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);
  function handleResendOTP() {
    dispatch(sendOtp(signupData.email));
    console.log("resending otp");
  }
  return (
    // wrapper
    <section className="bg-richblack-900 text-richblack-5 relative flex h-screen w-screen flex-1 items-center justify-center select-none">
      {/* Verify email Box */}
      <div className="flex w-1/3 flex-col items-start justify-center gap-6 rounded-lg p-8">
        {/* Title and Subtitle */}
        <div className="flex flex-col gap-3">
          <h1 className="text-richblack-5 text-3xl leading-9">Verify email</h1>
          <p className="text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>
        </div>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          placeholder={"000000"}
          renderSeparator={<span className="text-richblack-5">-</span>}
          shouldAutoFocus={true}
          containerStyle="flex justify-center w-full gap-4"
          renderInput={(props) => (
            <input
              {...props}
              className="bg-richblack-800 border-richblack-700 rounded-sm border text-center text-xl shadow-md transition-all duration-150 ease-in-out focus:scale-105"
            />
          )}
        />

        {/* Submit Button & Return to Login Link */}
        <div className="flex w-full flex-col gap-3">
          <LongCTAButton type="submit">Update Password</LongCTAButton>
          <div className="flex flex-row justify-between">
            <Link to="/login">
              <div className="flex items-center justify-start gap-2 rounded-lg p-3">
                <BsArrowLeft />
                <p>Return to Login</p>
              </div>
            </Link>
            <button
              className="flex items-center justify-start gap-2 rounded-lg p-3 text-blue-100"
              onClick={handleResendOTP}
            >
              <FaClockRotateLeft /> <p>Resend</p>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
