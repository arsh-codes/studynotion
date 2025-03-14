import Header from "@client/components/core/Dashboard/Header";
import { Link } from "react-router-dom";
import React from "react";
import { RiFileEditLine } from "react-icons/ri";
import Sidebar from "@components/core/Dashboard/Sidebar";
import { useSelector } from "react-redux";
export default function MyProfile() {
  // Extract profile-related state in a single `useSelector` call
  const { profileLoading, user } = useSelector((state) => state.profile);

  // Show loading state if profile data is still loading
  if (profileLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-black">
        LOADING SPINNER...
      </div>
    );
  }

  return (
    // Wrapper section
    <section className="bg-richblack-900 flex w-screen flex-1 flex-row gap-1">
      <Sidebar />
      <div className="text-richblack-300 w-full border">
        <Header pageName="My Profile" />
        <section className="bg-richblack-700 my-8 ml-30 flex w-7/12 flex-row items-center gap-6 rounded-lg p-6">
          {/* display image */}
          <img
            src={user?.image}
            className="aspect-square h-10 w-10 rounded-full"
            alt=""
          />
          {/* name and email  */}
          <div>
            <span className="text-richblack-5 flex flex-row">
              {user.firstName} {user.lastName}
            </span>
            <span className="text-richblack-300">{user.email}</span>
          </div>
          {/* edit button */}
          <button className="`flex text-richblack-900 flex w-fit cursor-pointer flex-row items-center gap-2 rounded-lg bg-yellow-50 px-6 py-3 text-center text-base font-medium shadow-md">
            <RiFileEditLine />
            <p>Edit</p>
          </button>
        </section>
      </div>
    </section>
  );
}
