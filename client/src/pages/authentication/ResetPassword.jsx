import { Link, useParams } from "react-router-dom"; // For extracting token & navigation
// Import necessary dependencies
import React, { useState } from "react";

import { BsArrowLeft } from "react-icons/bs"; // Back arrow icon
import LongCTAButton from "@components/common/Form/LongCTAButton"; // Button component
import PasswordField from "@components/common/Form/PasswordField"; // Password input component
import { resetPassword } from "@services/operations/authAPI"; // API function for password reset
import toast from "react-hot-toast"; // Toast notifications
import { useDispatch } from "react-redux"; // Redux hooks

export default function ResetPassword() {
  const dispatch = useDispatch(); // Initialize Redux dispatch
  const { token } = useParams(); // Extract token from URL

  const [newPassword, setNewPassword] = useState(""); // State for new password

  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password

  // Function to handle password reset
  function handleResetPassword(event) {
    event.preventDefault(); // Prevent default form submission

    // Check if token is missing
    if (!token) {
      toast.error("Invalid or expired reset link.");
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }

    // Dispatch password reset action
    dispatch(resetPassword(newPassword, confirmPassword, token));
  }

  return (
    <section className="bg-richblack-900 text-richblack-5 relative flex h-screen w-screen flex-1 items-center justify-center select-none">
      {/* Reset Password Box */}
      <div className="flex w-1/3 flex-col items-start justify-center gap-6 rounded-lg p-8">
        {/* Title and Subtitle */}
        <div className="flex flex-col gap-3">
          <h1 className="text-richblack-5 text-3xl leading-9">
            Set a New Password
          </h1>
          <p className="text-richblack-100">
            Enter your new password below. Make sure it's strong and secure.
          </p>
        </div>

        {/* Form for password reset */}
        <form
          onSubmit={handleResetPassword}
          className="flex w-full flex-col gap-6"
        >
          {/* Password fields */}
          <div className="flex flex-col gap-5">
            <PasswordField
              id="newPasswordReset"
              labelName="New Password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required={true}
            />
            <PasswordField
              id="confirmPasswordReset"
              labelName="Confirm Password"
              placeholder="Re-enter your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required={true}
            />
          </div>

          {/* Submit Button & Return to Login Link */}
          <div className="flex w-full flex-col gap-3">
            <LongCTAButton type="submit">Update Password</LongCTAButton>
            <Link to="/login">
              <div className="flex items-center justify-start gap-2 rounded-lg p-3">
                <BsArrowLeft />
                <p>Return to Login</p>
              </div>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
