import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateDisplayPicture } from "@client/services/operations/profileApi";
import { useForm } from "react-hook-form";

function ChangeProfilePicture() {
  const { profileLoading, user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) =>
    dispatch(updateDisplayPicture(data.displayPicture[0]));
  const [imageInputVisibility, setImageInputVisibility] = useState(false);

  function handleRemovePicture() {}

  // Styling classes
  const inputClassName =
    "bg-richblack-700 w-full text-richblack-200 rounded-lg p-3 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]";
  const labelClassName = "text-richblack-5 pb-1.5";

  return (
    <section className="bg-richblack-800 outline-richblack-600 relative my-8 ml-30 flex w-9/12 flex-row items-center justify-between gap-6 rounded-lg p-6 outline-1">
      <div className="flex flex-row items-start gap-6">
        {/* Profile Image */}
        <img
          src={user?.image}
          className="aspect-square h-19 w-19 rounded-full object-cover"
          alt="Profile"
        />
        <div className="flex flex-col gap-3">
          <span className="text-richblack-25 flex flex-row text-lg">
            Change Profile Picture
          </span>
          <div className="flex flex-row gap-3">
            <div
              className="text-richblack-900 flex w-fit cursor-pointer items-center justify-start gap-2 overflow-hidden rounded-lg bg-yellow-50 px-7 py-2 text-center shadow-md"
              onClick={() => setImageInputVisibility(!imageInputVisibility)}
            >
              Change
            </div>
            <div
              className="bg-richblack-600 text-richblack-5 flex w-fit cursor-pointer items-center justify-start gap-2 overflow-hidden rounded-lg px-7 py-2 text-center text-base font-medium shadow-md"
              onClick={handleRemovePicture}
            >
              Remove
            </div>
          </div>
          {imageInputVisibility && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <label
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="imageInput"
              >
                Upload file
              </label>
              <input
                className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
                id="imageInput"
                type="file"
                {...register("displayPicture", {
                  required: "Please upload a file",
                })}
              />
              <button
                type="submit"
                className="mt-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default ChangeProfilePicture;
