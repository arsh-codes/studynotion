import { useDispatch, useSelector } from "react-redux";

import { BsArrowLeft } from "react-icons/bs";
import FormField from "../components/common/Form/FormField";
import { Link } from "react-router-dom";
import LongCTAButton from "../components/common/Form/LongCTAButton";
import { getPasswordResetToken } from "../services/operations/authAPI";
import { useState } from "react";

export default function forgotPassword() {
  const dispatch = useDispatch(); // Initialize dispatch
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);
  function handleResetPassword() {
    console.log("BUTTON ");
    console.log("📝 -> handleResetPassword -> email=", email);
    if (email) dispatch(getPasswordResetToken(email));
  }

  return (
    // wrapper
    <div className="bg-richblack-900 text-richblack-5 relative flex h-screen w-screen flex-1 items-center justify-center select-none">
      <section className="flex w-1/3 flex-col items-start justify-center gap-9 rounded-lg p-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-richblack-5 text-3xl leading-9">
            Check Your Inbox
          </h1>
          <p className="text-richblack-100 leading-relaxed">
            We've sent a password reset link to {email?email:"your email"}. Please check your
            inbox and follow the instructions to reset your password.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3">
          <LongCTAButton onClick={handleResetPassword}>
            Resend Email
          </LongCTAButton>
          <Link to="/login">
            <div className="flex items-center justify-start gap-2 rounded-lg p-3">
              <BsArrowLeft />
              <p>Back to login</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="flex w-1/3 flex-col items-start justify-center gap-9 rounded-lg p-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-richblack-5 text-3xl leading-9">
            Forgot Your Password?
          </h1>
          <p className="text-richblack-100 leading-relaxed">
            No worries! Enter your email, and we'll send you instructions to
            reset your password. If you can’t access your email, we can help
            with account recovery.
          </p>
        </div>

        {/* Email Field */}
        <FormField
          labelName="Email Address"
          inputType="email"
          id="email"
          name="email"
          placeholder="Enter email address"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <LongCTAButton onClick={handleResetPassword}>
          Reset Password
        </LongCTAButton>
      </section>
    </div>
  );
}
