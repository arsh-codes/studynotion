import React, { useState } from "react";
import {
  removeDisplayPicture,
  updateDisplayPicture,
} from "@client/services/operations/profileApi";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";

export default function ChangeProfilePicture() {
  const { profileLoading, user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(updateDisplayPicture(data.displayPicture[0]));
    setImageInputVisibility(false);
  };
  const [imageInputVisibility, setImageInputVisibility] = useState(false);
  const [removeImageVisibility, setRemoveImageVisibility] = useState(false);

  function handleRemovePicture() {
    setRemoveImageVisibility(false);
    dispatch(removeDisplayPicture());
  }

  // Styling classes

  const yellowButtonClassName =
    "flex items-center justify-center gap-2 px-7 py-2 rounded-lg shadow-md cursor-pointer bg-yellow-50 text-richblack-900 text-base font-medium transition-all    hover:bg-yellow-100 active:scale-95";

  const greyButtonClassName =
    "flex items-center justify-center gap-2 px-7 py-2 rounded-lg shadow-md cursor-pointer bg-richblack-600 text-richblack-5 text-base font-medium transition-all    hover:bg-richblack-700 active:scale-95";

  return (
    <section className="bg-richblack-800 outline-richblack-600 hover:outline-richblack-500 relative my-8 ml-30 flex w-9/12 flex-row items-center justify-between gap-6 rounded-lg p-6 shadow-md outline transition-all">
      <div className="flex flex-row items-start gap-6">
        {/* Profile Image */}
        <img
          src={user?.image}
          className="aspect-square h-19 w-19 rounded-full object-cover"
          alt={`${user?.name || "User"}'s Profile Picture`}
        />
        <div className="flex flex-col gap-3">
          <span className="text-richblack-25 flex flex-row text-lg">
            Change Profile Picture
          </span>
          <div className="flex flex-row gap-3">
            <div
              className={yellowButtonClassName}
              onClick={() => {
                setRemoveImageVisibility(false);
                setImageInputVisibility(true);
              }}
            >
              Change
            </div>
            <div
              className={greyButtonClassName}
              onClick={() => {
                setRemoveImageVisibility(true);
                setImageInputVisibility(false);
              }}
            >
              Remove
            </div>
          </div>
          {/* if Image input is visible */}
          {imageInputVisibility && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-richblack-700 flex flex-col gap-3 rounded-lg p-3"
            >
              <label className="" htmlFor="imageInput">
                Upload file
              </label>
              <input
                className="bg-richblack-600 text-richblack-200 placeholder-richblack-400 focus:ring-richblack-400 w-full rounded-lg p-3 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)] transition-all outline-none focus:ring-2"
                id="imageInput"
                type="file"
                {...register("displayPicture", {
                  required: "Please upload a file",
                })}
              />
              <div className="flex flex-row justify-center gap-5">
                <button type="submit" className={yellowButtonClassName}>
                  Submit
                </button>
                <div
                  className={greyButtonClassName}
                  onClick={() => {
                    setImageInputVisibility(false);
                  }}
                >
                  Cancel
                </div>
              </div>
            </form>
          )}
          {removeImageVisibility && ( // if remove image is visible
            <div className="bg-richblack-700 flex flex-col gap-3 rounded-lg p-3">
              <p>Are you sure to remove the profile picture?</p>
              <div className="flex flex-row justify-center gap-5">
                <div
                  className={yellowButtonClassName}
                  onClick={handleRemovePicture}
                >
                  Yes
                </div>
                <div
                  className={greyButtonClassName}
                  onClick={() => {
                    setRemoveImageVisibility(false);
                  }}
                >
                  No
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
