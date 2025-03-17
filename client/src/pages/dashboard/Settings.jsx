import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChangePassword from "@client/components/core/Dashboard/Settings/ChangePassword";
import ChangeProfilePicture from "@client/components/core/Dashboard/Settings/ChangeProfilePicture";
import EditProfile from "@components/core/Dashboard/Settings/EditProfile";
import Header from "@client/components/core/Dashboard/Header";
import { RiDeleteBinLine } from "react-icons/ri";
import Sidebar from "@components/core/Dashboard/Sidebar";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { profileLoading, user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function handleDeleteAccount() {
    // Placeholder: Implement API call to delete account
    toast.error("Delete Account functionality not implemented yet.");
  }
  const yellowButtonClassName =
    "flex items-center justify-center gap-2 px-7 py-2 rounded-lg shadow-md cursor-pointer bg-yellow-50 text-richblack-900 text-base font-medium transition-all hover:bg-yellow-100 active:scale-95";

  const greyButtonClassName =
    "flex items-center justify-center gap-2 px-7 py-2 rounded-lg shadow-md cursor-pointer bg-richblack-600 text-richblack-5 text-base font-medium transition-all hover:bg-richblack-700 active:scale-95";

  return (
    <section className="bg-richblack-900 flex flex-1 flex-row gap-1">
      <Sidebar />
      <div className="text-richblack-300 w-full">
        <Header pageName="Settings" />
        <ChangeProfilePicture />
        <EditProfile />
        <ChangePassword />
        <div className="w-[400px] rounded-2xl bg-white p-6 text-center shadow-lg">
          <h2 className="text-richblack-900 text-xl font-bold">
            Reset or Change Password?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Choose whether you want to reset your password or change it
            manually.
          </p>

          <div className="mt-6 flex flex-col gap-4">
            <button className={yellowButtonClassName}>Reset Password</button>
            <button className={greyButtonClassName}>Change Password</button>
          </div>

          <button className="mt-4 text-sm text-gray-500 hover:underline">
            Cancel
          </button>
        </div>
        {/* Delete Account Section */}
        <section className="relative my-8 ml-30 flex w-9/12 flex-row items-start gap-5 rounded-lg bg-pink-800 p-6 outline-1 outline-pink-700">
          <div className="h-full rounded-full bg-pink-700 p-3">
            <RiDeleteBinLine className="h-6 w-6 text-pink-200" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg leading-relaxed font-bold text-[#fff1f1]">
              Delete Account
            </h2>
            <p className="text-sm leading-snug font-medium text-[#fbc7d1]">
              Would you like to delete your account?
            </p>
            <p className="text-pink-25 text-sm leading-snug font-medium">
              This account contains Paid Courses. Deleting your account will
              remove all content associated with it.
            </p>
            <div
              className="cursor-pointer text-pink-300 underline"
              onClick={handleDeleteAccount}
            >
              I want to delete my account.
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
