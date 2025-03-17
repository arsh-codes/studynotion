import { BsFileEarmarkCheckFill, BsThreeDotsVertical } from "react-icons/bs";
import React, { useCallback, useEffect, useRef, useState } from "react";

import Header from "@client/components/core/Dashboard/Header";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Sidebar from "@components/core/Dashboard/Sidebar";
import sampleCoursesData from "@data/sampleCoursesData";

export default function EnrolledCourses() {
  const [activeMenuIndex, setActiveMenuIndex] = useState(null); // Tracks which menu is open
  const menuRef = useRef(null); // Creates a reference to store the DOM element of the active menu

  // Handles toggling the option menu for each course
  const handleOptionMenu = useCallback((index) => {
    setActiveMenuIndex((prev) => (prev === index ? null : index));
  }, []);

  useEffect(() => {
    // Function to close menu when clicking outside
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuIndex(null); // Closes the menu when clicking outside
      }
    }

    // Function to close menu when scrolling
    function handleScroll() {
      setActiveMenuIndex(null);
    }

    // Adds event listeners when the component mounts
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Removes event listeners when the component unmounts to avoid memory leaks
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="bg-richblack-900 flex flex-1 flex-row gap-1">
      <Sidebar />
      <div className="text-richblack-300 w-full pb-20">
        <Header pageName="Enrolled Courses" />
        <section className="bg-richblack-900 outline-richblack-600 hover:outline-richblack-500 relative mx-10 my-8 flex w-11/12 flex-col gap-6 rounded-md shadow-md outline transition-all">
          {/* First row headings */}
          <div className="text-richblack-50 bg-richblack-700 grid grid-cols-10 gap-x-5 self-stretch p-6">
            <h2 className="col-span-5">Course Name</h2>
            <h2 className="col-span-2">Duration</h2>
            <h2 className="col-span-2">Progress</h2>
          </div>

          {/* Looping through courses */}
          {sampleCoursesData.map((course, index) => (
            <div
              key={index}
              className="text-richblack-50 border-richblack-700 relative grid w-full grid-cols-10 gap-x-5 border-b p-6"
            >
              {/* Course Information */}
              <div className="col-span-5 flex flex-row items-center gap-5">
                <img
                  src={course.thumbnailImage}
                  className="h-12 w-12"
                  alt={course.title}
                />
                <div className="flex flex-col">
                  <p>{course.title}</p>
                  <p className="text-richblack-300">{course.description}</p>
                </div>
              </div>

              {/* Course Duration */}
              <div className="col-span-2 flex items-center">
                {course.duration}
              </div>

              {/* Progress Bar */}
              <div className="col-span-2 flex items-center">
                <div className="relative h-2 w-full rounded-full bg-gray-700">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      course.progress < 75
                        ? "bg-blue-100"
                        : "bg-caribbeangreen-100"
                    }`}
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm">{course.progress}%</span>
              </div>

              {/* Options Menu Button */}
              <button
                className="relative col-span-1 flex items-center justify-center"
                onClick={() => handleOptionMenu(index)}
              >
                <BsThreeDotsVertical />
              </button>

              {/* Options Menu (Dropdown) */}
              {activeMenuIndex === index && (
                <div
                  ref={menuRef} // Attaches ref to menu to detect outside clicks
                  className="text-richblack-50 absolute top-24 right-10 inline-flex flex-col items-start gap-3 rounded-lg bg-[#424854] p-3 font-semibold outline outline-offset-[-1px] outline-[#585d69]"
                >
                  <div className="flex flex-row gap-3">
                    <BsFileEarmarkCheckFill className="h-5 w-5" />
                    <p>Mark as Completed</p>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <RiDeleteBin6Fill className="h-5 w-5" />
                    <p>Remove</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </section>
  );
}
