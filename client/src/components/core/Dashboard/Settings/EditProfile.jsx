import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateProfile } from "@client/services/operations/profileApi";
import { useForm } from "react-hook-form";

export default function EditProfile() {
  const { profileLoading, user } = useSelector((state) => state.profile);
  const [isEditable, setIsEditable] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Update form values when `user` data is available
  useEffect(() => {
    if (user) {
      reset({
        displayName: user?.firstName || "",
        profession:
          user?.profession?.toLowerCase().replace(/\s+/g, "_") || "student",
        dateOfBirth: user?.additionalDetails?.dateOfBirth
          ? user.additionalDetails.dateOfBirth.split("T")[0]
          : "",
        gender: user?.additionalDetails?.gender || "",
        about: user?.additionalDetails?.about || "",
      });
    }
  }, [user, reset]);

  function onSubmit(data) {
    dispatch(updateProfile(data));
  }

  const yellowButtonClassName =
    "flex items-center justify-center gap-2 px-7 py-2 rounded-lg shadow-md cursor-pointer bg-yellow-50 text-richblack-900 text-base font-medium transition-all hover:bg-yellow-100 active:scale-95";

  const greyButtonClassName =
    "flex items-center justify-center gap-2 px-7 py-2 rounded-lg shadow-md cursor-pointer bg-richblack-600 text-richblack-5 text-base font-medium transition-all hover:bg-richblack-700 active:scale-95";

  return (
    <section className="bg-richblack-800 outline-richblack-600 hover:outline-richblack-500 relative my-8 ml-30 flex w-9/12 flex-col items-start justify-between gap-5 rounded-lg p-6 shadow-md outline transition-all">
      <h2 className="text-richblack-25 flex flex-row text-lg">
        Profile Information
      </h2>

      {/* Toggle Edit Mode */}
      <button
        type="button"
        onClick={() => setIsEditable(!isEditable)}
        className={isEditable ? greyButtonClassName : yellowButtonClassName}
      >
        {isEditable ? "Cancel" : "Edit"}
      </button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-x-6 gap-y-5"
      >
        <div>
          <label htmlFor="displayName" className="text-richblack-5 pb-1.5">
            Display Name
          </label>
          <input
            {...register("displayName")}
            disabled={!isEditable}
            className="bg-richblack-700 text-richblack-200 w-full rounded-lg p-3"
          />
        </div>

        <div>
          <label htmlFor="profession" className="text-richblack-5 pb-1.5">
            Profession
          </label>
          <select
            {...register("profession")}
            disabled={!isEditable}
            className="bg-richblack-700 text-richblack-200 w-full rounded-lg p-3"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="developer">Developer</option>
            <option value="frontend_developer">Frontend Developer</option>
            <option value="backend_developer">Backend Developer</option>
            <option value="fullstack_developer">Full Stack Developer</option>
            <option value="mobile_developer">Mobile Developer</option>
            <option value="devops_engineer">DevOps Engineer</option>
            <option value="cloud_engineer">Cloud Engineer</option>
            <option value="data_scientist">Data Scientist</option>
            <option value="machine_learning_engineer">
              Machine Learning Engineer
            </option>
            <option value="ai_engineer">AI Engineer</option>
            <option value="cybersecurity_analyst">Cybersecurity Analyst</option>
            <option value="blockchain_developer">Blockchain Developer</option>
            <option value="embedded_software_engineer">
              Embedded Software Engineer
            </option>
            <option value="game_developer">Game Developer</option>
            <option value="qa_engineer">QA Engineer</option>
            <option value="automation_engineer">Automation Engineer</option>
            <option value="site_reliability_engineer">
              Site Reliability Engineer (SRE)
            </option>
            <option value="system_architect">System Architect</option>
            <option value="database_administrator">
              Database Administrator
            </option>
            <option value="ui_ux_designer">UI/UX Designer</option>
            <option value="software_consultant">Software Consultant</option>
            <option value="technical_writer">Technical Writer</option>
            <option value="it_support_engineer">IT Support Engineer</option>
            <option value="cto">Chief Technology Officer (CTO)</option>
            <option value="software_engineering_manager">
              Software Engineering Manager
            </option>
            <option value="freelancer">Freelancer</option>
            <option value="entrepreneur">Entrepreneur</option>
            <option value="researcher">Researcher</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="text-richblack-5 pb-1.5">
            Date of Birth
          </label>
          <input
            type="date"
            {...register("dateOfBirth")}
            disabled={!isEditable}
            className="bg-richblack-700 text-richblack-200 w-full rounded-lg p-3"
          />
        </div>

        <div>
          <label className="text-richblack-5 pb-1.5">Gender</label>
          <div className="bg-richblack-700 text-richblack-200 grid w-full grid-cols-3 rounded-lg p-3">
            <label className="text-richblack-5 flex gap-3">
              <input
                type="radio"
                value="male"
                {...register("gender")}
                disabled={!isEditable}
              />
              <p>Male</p>
            </label>
            <label className="text-richblack-5 flex gap-3">
              <input
                type="radio"
                value="female"
                {...register("gender")}
                disabled={!isEditable}
              />
              Female
            </label>
            <label className="text-richblack-5 flex gap-3">
              <input
                type="radio"
                value="other"
                {...register("gender")}
                disabled={!isEditable}
              />
              Other
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="about" className="text-richblack-5 pb-1.5">
            About
          </label>
          <textarea
            {...register("about")}
            disabled={!isEditable}
            className="bg-richblack-700 text-richblack-200 w-full rounded-lg p-3"
          ></textarea>
        </div>

        {/* Show Save button only when form is editable */}
        {isEditable && (
          <button
            type="submit"
            className={`${yellowButtonClassName} col-span-2`}
          >
            Save Changes
          </button>
        )}
      </form>
    </section>
  );
}
