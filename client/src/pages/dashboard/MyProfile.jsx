import { Link, Navigate, useNavigate } from "react-router-dom";

import Header from "@client/components/core/Dashboard/Header";
import React from "react";
import { RiFileEditLine } from "react-icons/ri";
import Sidebar from "@components/core/Dashboard/Sidebar";
import { element } from "prop-types";
import { useSelector } from "react-redux";

export default function MyProfile() {
  // Extract profile-related state in a single `useSelector` call
  const { profileLoading, user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  // Show loading state if profile data is still loading
  if (profileLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-black">
        LOADING SPINNER...
      </div>
    );
  }
  const personalDetails = [
    { property: "First Name", value: user.firstName ?? "-" },
    { property: "Last Name", value: user.lastName ?? "-" },
    { property: "Email", value: user.email ?? "-" },
    { property: "Phone Number", value: user.phoneNumber ?? "-" },
    { property: "Account Type", value: user.accountType ?? "-" },
    {
      property: "Joined on",
      value: user.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-GB")
        : "-",
    },
  ];
  function handleEditButton() {
    navigate("/dashboard/settings");
  }
  return (
    // Wrapper section
    <section className="bg-richblack-900 flex w-screen flex-1 flex-row gap-1">
      <Sidebar />
      <div className="text-richblack-300 w-full border">
        <Header pageName="My Profile" />
        {/* first card  */}
        <section className="bg-richblack-800 outline-richblack-600 relative my-8 ml-30 flex w-7/12 flex-row items-center justify-between gap-6 rounded-lg p-6 outline-1">
          {/* image and details */}
          <div className="flex flex-row items-center gap-6">
            {/* display image */}
            <img
              src={user?.image}
              className="aspect-square h-19 w-19 rounded-full"
              alt=""
            />
            {/* name and email  */}
            <div>
              <span className="text-richblack-5 flex flex-row text-lg font-semibold">
                {user.firstName} {user.lastName}
              </span>
              <span className="text-richblack-300">{user.email}</span>
            </div>
          </div>

          {/* edit button */}
          <button
            className="`flex text-richblack-900 flex w-fit cursor-pointer flex-row items-center gap-2 rounded-lg bg-yellow-50 px-6 py-3 text-center text-base font-medium shadow-md"
            onClick={handleEditButton}
          >
            <RiFileEditLine className="h-5 w-5" />
            <p>Edit</p>
          </button>
        </section>
        {/* second card */}
        <section className="bg-richblack-800 outline-richblack-600 relative my-8 ml-30 flex w-7/12 flex-col items-center justify-between gap-6 rounded-lg p-6 outline-1">
          {/* Heading and edit button */}
          <div className="flex w-full flex-row items-center justify-between">
            <h2 className="text-richblack-5 text-lg font-semibold">
              Personal Details
            </h2>
            {/* edit button */}
            <button
              className="`flex text-richblack-900 flex w-fit cursor-pointer flex-row items-center gap-2 rounded-lg bg-yellow-50 px-6 py-3 text-center text-base font-medium shadow-md"
              onClick={handleEditButton}
            >
              <RiFileEditLine className="h-5 w-5" />
              <p>Edit</p>
            </button>
          </div>

          {/* Personal Details */}

          <div className="grid w-full grid-cols-2 gap-y-5">
            {personalDetails.map((element, index) => (
              <div key={index} className="flex flex-col">
                <p className="text-richblack-400 text-sm leading-snug">
                  {element.property}
                </p>
                <p className="text-richblack-5 text-sm leading-snug font-medium">
                  {element.value}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
