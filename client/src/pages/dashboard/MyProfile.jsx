import React from "react";
import Sidebar from "@components/core/Dashboard/Sidebar";
import { useSelector } from "react-redux";

export default function MyProfile() {
  const { profileLoading } = useSelector((state) => state.profile);
  if (profileLoading) {
    return <div> LOADING SPINNER</div>;
  }
  return (
    // wrapper
    <section className="bg-richblack-900 flex flex-1 flex-row gap-1">
      <Sidebar />
    </section>
  );
}
