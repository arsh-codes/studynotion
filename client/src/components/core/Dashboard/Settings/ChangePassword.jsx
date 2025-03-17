import React from "react";
import { useForm } from "react-hook-form";
export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Styling classes
  const inputClassName =
    "bg-richblack-700 w-full text-richblack-200 rounded-lg p-3 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]";
  const labelClassName = "text-richblack-5 pb-1.5";

  const yellowButtonClassName =
    "flex items-center justify-center gap-2 px-7 py-2 rounded-lg shadow-md cursor-pointer bg-yellow-50 text-richblack-900 text-base font-medium transition-all hover:bg-yellow-100 active:scale-95";

  const greyButtonClassName =
    "flex items-center justify-center gap-2 px-7 py-2 rounded-lg shadow-md cursor-pointer bg-richblack-600 text-richblack-5 text-base font-medium transition-all hover:bg-richblack-700 active:scale-95";

  return (
    <section className="bg-richblack-800 outline-richblack-600 hover:outline-richblack-500 relative my-8 ml-30 flex w-9/12 flex-col items-start justify-between gap-5 rounded-lg p-6 shadow-md outline transition-all">
      <h2 className="text-richblack-25 flex flex-row text-lg">
        Change Password
      </h2>
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
          <button type="submit" className="rounded bg-blue-500 p-2 text-white">
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
}
