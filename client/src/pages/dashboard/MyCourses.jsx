import Header from "@client/components/core/Dashboard/Header";
import React from 'react'
import Sidebar from "@components/core/Dashboard/Sidebar";
export default function MyCourses() {
  return (
  <section className="bg-richblack-900 flex flex-1 flex-row gap-1">
      <Sidebar />
      <Header pageName="My Courses"/>

    </section>
  )
}
