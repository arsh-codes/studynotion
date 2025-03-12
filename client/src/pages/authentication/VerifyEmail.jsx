import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { sendOtp, signup } from "@services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";

import { BsArrowLeft } from "react-icons/bs";
import { FaClockRotateLeft } from "react-icons/fa6";
import LongCTAButton from "@components/common/Form/LongCTAButton";
import OtpInput from "react-otp-input";
import { setSignupData } from "@redux/slices/authSlice";
import toast from "react-hot-toast";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");

  // Extracting signupData from Redux store
  const { signupData } = useSelector((state) => state.auth);

  // Redirect user to signup page if signupData is missing
  useEffect(() => {
    if (!signupData || !signupData.email) {
      toast.error("Details missing. Redirecting to Sign Up page.");
      navigate("/signup");
    }
  }, [signupData, navigate]); // ✅ Added dependency array to prevent infinite re-renders

  // Function to resend OTP
  function handleResendOTP() {
    if (!signupData?.email) {
      toast.error("Email not found. Please sign up again.");
      navigate("/signup");
      return;
    }

    dispatch(sendOtp(signupData.email, navigate)); // ✅ Passed navigate properly
    toast.success("OTP has been resent.");
  }

  // Function to verify OTP
  function handleVerification() {
    if (!otp || otp.length !== 6) {
      toast.error("Invalid OTP. Please enter a 6-digit code.");
      return;
    }

    const updatedSignupData = { ...signupData, otp };
    dispatch(setSignupData(updatedSignupData));
    dispatch(signup(updatedSignupData, navigate));
  }

  return (
    <section className="bg-richblack-900 text-richblack-5 flex h-screen w-screen items-center justify-center select-none">
      {/* Verify Email Box */}
      <div className="flex w-1/3 flex-col items-start gap-6 rounded-lg p-8">
        {/* Title & Description */}
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold">Verify Email</h1>
          <p className="text-richblack-100">
            A verification code has been sent to {signupData?.email}. Enter the
            code below.
          </p>
        </div>

        {/* OTP Input */}
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          placeholder="000000"
          renderSeparator={<span className="text-richblack-5">-</span>}
          shouldAutoFocus
          containerStyle="flex justify-center w-full gap-4"
          renderInput={(props) => (
            <input
              {...props}
              className="bg-richblack-800 border-richblack-700 rounded-sm border text-center text-xl shadow-md focus:scale-105"
            />
          )}
        />

        {/* Buttons */}
        <div className="flex w-full flex-col gap-3">
          <LongCTAButton onClick={handleVerification}>Verify</LongCTAButton>
          <div className="flex justify-between">
            <Link to="/login" className="flex items-center gap-2 p-3">
              <BsArrowLeft /> <p>Return to Login</p>
            </Link>
            <button
              className="flex items-center gap-2 p-3 text-blue-100"
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
