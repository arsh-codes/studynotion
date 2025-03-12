import { useDispatch, useSelector } from "react-redux";

import { BsArrowLeft } from "react-icons/bs"; // ✅ FIXED: Added missing icon import
import FormField from "@components/common/Form/FormField";
import { Link } from "react-router-dom";
import LongCTAButton from "@components/common/Form/LongCTAButton";
import { getPasswordResetToken } from "@services/operations/authAPI";
import { useState } from "react";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const loading = useSelector((state) => state.auth.loading);

  function handleResetPassword(e) {
    e.preventDefault();
    if (email) dispatch(getPasswordResetToken(email, setEmailSent));
  }

  return (
    <section className="bg-richblack-900 text-richblack-5 flex h-screen w-screen items-center justify-center select-none">
      {emailSent ? (
        <section className="flex w-1/3 flex-col items-start justify-center gap-6 rounded-lg p-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl">Check Your Inbox</h1>
            <p className="text-richblack-100">
              We've sent a password reset link to <strong>{email}</strong>.
              Please check your inbox and follow the instructions to reset your
              password.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3">
            <LongCTAButton onClick={handleResetPassword}>
              Resend Email
            </LongCTAButton>
            <Link to="/login">
              <div className="flex items-center gap-2 p-3">
                <BsArrowLeft />
                <p>Back to login</p>
              </div>
            </Link>
          </div>
        </section>
      ) : (
        <section className="flex w-1/3 flex-col items-start justify-center gap-6 rounded-lg p-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl">Forgot Your Password?</h1>
            <p className="text-richblack-100">
              No worries! Enter your email, and we'll send you instructions to
              reset your password.
            </p>
          </div>
          <form onSubmit={handleResetPassword} className="w-full">
            <FormField
              labelName="Email Address"
              inputType="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <LongCTAButton type="submit">Reset Password</LongCTAButton>
          </form>
        </section>
      )}
    </section>
  );
}
