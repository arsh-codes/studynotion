import CourseInformation from "@client/components/core/Dashboard/AddCourse/CourseInformation";
import { Link } from "react-router-dom";
import React from "react";
import RenderSteps from "@client/components/core/Dashboard/AddCourse/RenderSteps";
import Sidebar from "@components/core/Dashboard/Sidebar";

export default function AddCourse() {
  return (
    <section className="bg-richblack-900 flex flex-1 flex-row gap-1">
      <Sidebar />
      {/* wrapper */}
      <div className="text-richblack-5 mb-20 grid w-full grid-cols-10 gap-x-6 p-6">
        {/* left section course making */}
        <RenderSteps />
        {/* right course upload tips section  */}
        <section className="text-richblack-5 col-span-4 h-fit flex-col items-start justify-start gap-[19px] overflow-hidden rounded-lg bg-[#161d29] p-6 outline outline-offset-[-1px] outline-[#2c333f]">
          <h2 className="text-lg font-semibold">Course Upload Tips</h2>

          <ul className="flex flex-col gap-3 text-xs">
            <li>&#x2022; Set a price for your course or offer it for free.</li>
            <li>&#x2022; Recommended thumbnail size: 1024x576 pixels.</li>
            <li>
              &#x2022; Use the Video section to manage the course overview
              video.
            </li>
            <li>
              &#x2022; The Course Builder helps you create and organize course
              content.
            </li>
            <li>
              &#x2022; Add topics in the Course Builder to include lessons,
              quizzes, and assignments.
            </li>
            <li>
              &#x2022; Information from the Additional Data section appears on
              the course page.
            </li>
            <li>
              &#x2022; Use Announcements to share important updates with
              students.
            </li>
            <li>&#x2022; Send Notes to all enrolled students at once.</li>
          </ul>
        </section>
      </div>
    </section>
  );
}
