import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChangeProfilePicture from "@client/components/core/Dashboard/Settings/ChangeProfilePicture";
import Header from "@client/components/core/Dashboard/Header";
import { RiDeleteBinLine } from "react-icons/ri";
import Sidebar from "@components/core/Dashboard/Sidebar";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { profileLoading, user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  const [imageInputVisibility, setImageInputVisibility] = useState(false);

  function handleImageInput() {}

  function handleRemovePicture() {
    // Placeholder: Implement API call to remove picture
    toast.error("Remove Picture functionality not implemented yet.");
  }

  function handleDeleteAccount() {
    // Placeholder: Implement API call to delete account
    toast.error("Delete Account functionality not implemented yet.");
  }
  // Styling classes
  const inputClassName =
    "bg-richblack-700 w-full text-richblack-200 rounded-lg p-3 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]";
  const labelClassName = "text-richblack-5 pb-1.5";

  return (
    <section className="bg-richblack-900 flex flex-1 flex-row gap-1">
      <Sidebar />
      <div className="text-richblack-300 w-full border">
        <Header pageName="Settings" />
        <ChangeProfilePicture />
        {/* Edit Profile Information */}
        <section className="bg-richblack-800 outline-richblack-600 relative my-8 ml-30 flex w-9/12 flex-col items-start justify-between gap-5 rounded-lg p-6 outline-1">
          <h2 className="text-richblack-25 flex flex-row text-lg">
            Profile Information
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-x-6 gap-y-5"
          >
            <div>
              <label htmlFor="displayName" className={labelClassName}>
                Display Name
              </label>
              <input {...register("displayName")} className={inputClassName} />
            </div>

            <div>
              <label htmlFor="profession" className={labelClassName}>
                Profession
              </label>
              <select {...register("profession")} className={inputClassName}>
                <option value="developer">Developer</option>
                <option value="tester">Tester</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="dateOfBirth" className={labelClassName}>
                Date of Birth
              </label>
              <input
                type="date"
                {...register("dateOfBirth")}
                className={inputClassName}
              />
            </div>

            <div>
              <label className={labelClassName}>Gender</label>
              <div className="bg-richblack-700 text-richblack-200 grid w-full grid-cols-3 rounded-lg p-3 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]">
                <label className="text-richblack-5 flex gap-3">
                  <input type="radio" value="male" {...register("gender")} />
                  <p>Male</p>
                </label>
                <label className="text-richblack-5 flex gap-3">
                  <input type="radio" value="female" {...register("gender")} />
                  Female
                </label>
                <label className="text-richblack-5 flex gap-3">
                  <input type="radio" value="other" {...register("gender")} />
                  Other
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="about" className={labelClassName}>
                About
              </label>
              <textarea
                {...register("about")}
                className={inputClassName}
              ></textarea>
            </div>

            <button
              type="submit"
              className="col-span-2 rounded bg-blue-500 p-2 text-white"
            >
              Save Changes
            </button>
          </form>
        </section>
        {/* Change Password*/}
        <section className="bg-richblack-800 outline-richblack-600 relative my-8 ml-30 flex w-9/12 flex-col items-start justify-between gap-5 rounded-lg p-6 outline-1">
          <h2 className="text-richblack-25 text-lg">Change Password</h2>
          <form className="flex flex-col gap-5">
            {/* Current, New, and Confirm Password Inputs */}
            <section className="flex flex-row gap-6">
              <div>
                <label htmlFor="currentPassword" className={labelClassName}>
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  {...register("currentPassword")}
                  type="password"
                  className={inputClassName}
                />
              </div>
              <div>
                <label htmlFor="newPassword" className={labelClassName}>
                  New Password
                </label>
                <input
                  id="newPassword"
                  {...register("newPassword")}
                  type="password"
                  className={inputClassName}
                />
              </div>
            </section>

            <div>
              <label htmlFor="confirmPassword" className={labelClassName}>
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                {...register("confirmPassword")}
                type="password"
                className={inputClassName}
              />
            </div>

            <div className="self-end">
              <button
                type="submit"
                className="rounded bg-blue-500 p-2 text-white"
              >
                Save Changes
              </button>
            </div>
          </form>
        </section>

        {/* Delete Account Section */}
        <section className="relative my-8 ml-30 flex w-9/12 flex-row items-start justify-between gap-5 rounded-lg bg-pink-800 p-6 outline-1 outline-pink-700">
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
            <button
              className="text-pink-300 underline"
              onClick={handleDeleteAccount}
            >
              I want to delete my account.
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
