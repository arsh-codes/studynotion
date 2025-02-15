import HighlightText from "./HighlightText";
import CtaButton from "./CtaButton";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import { HomePageExploreCourses } from "../../../data/homePageExploreCourses";
import { FaUserGroup } from "react-icons/fa6";
import { PiTreeStructureFill } from "react-icons/pi";
import { useEffect } from "react";
const tabNames = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

export default function ExploreCoursesSection() {
  const [selectedTab, setSelectedTab] = useState(tabNames[0]);

  const [linkedCourses, setLinkedCourses] = useState(
    HomePageExploreCourses[0].courses,
  );
  const [selectedCourse, setSelectedCourse] = useState(linkedCourses[0]);
  const setCards = (tab, index) => {
    setSelectedTab(tab);
    setLinkedCourses(HomePageExploreCourses[index]?.courses || []);
  };
  useEffect(() => {
    setSelectedCourse();
  }, [selectedTab]);

  return (
    <section className="relative mx-auto w-11/12 px-4 py-8 select-none md:px-28">
      <div className="h-[28rem]"></div>
      <div className="absolute -top-0 right-1 left-1 flex flex-col items-center gap-8 md:gap-20">
        {/* Title and Subtitle */}
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-richblack-5 text-3xl font-semibold md:text-4xl md:leading-[44px]">
            Unlock the
            <HighlightText text="Power of Code" />
          </h3>

          <p className="text-richblack-300 text-center text-base font-medium text-balance md:text-lg">
            Learn to Build Anything You Can Imagine
          </p>
        </div>
        {/* Tabs */}
        <div className="bg-richblack-800 flex w-fit flex-col rounded-md p-2 md:flex-row md:gap-9 md:rounded-full">
          {tabNames.map((tab, index) => (
            <div
              key={index}
              className={`cursor-pointer rounded-full px-6 py-2 font-medium ${
                selectedTab === tab
                  ? "bg-richblack-900 text-richblack-5"
                  : "text-richblack-300 hover:bg-richblack-700 hover:text-richblack-5"
              }`}
              onClick={() => setCards(tab, index)}
            >
              {tab}
            </div>
          ))}
        </div>
        {/* Cards */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {linkedCourses.map((course, index) => (
            <div
              key={index}
              className={`relative flex h-fit flex-col gap-3 px-6 pt-8 pb-[52px] lg:w-1/3 ${
                selectedCourse === course
                  ? "bg-pure-grey-5 shadow-[12px_12px_0px_0px_rgba(255,214,10,1.00)]"
                  : "bg-richblack-800 hover:scale-105 hover:shadow-xl"
              } shadow-lg transition-transform duration-300`}
              onClick={() => setSelectedCourse(course)}
            >
              <div
                className={`text-xl leading-7 font-semibold ${selectedCourse === course ? "text-richblack-800" : "text-richblack-25"} `}
              >
                {course.heading}
              </div>
              <div
                className={`pb-3 leading-normal font-normal ${selectedCourse === course ? "text-richblack-500" : "text-richblack-400"} `}
              >
                {course.description}
              </div>

              {/* Footer Section */}
              <section
                className={`absolute right-0 bottom-0 left-0 flex justify-between border-t ${selectedCourse === course ? "border-richblack-50 text-blue-500" : "border-richblack-600 text-richblack-300"} px-6 py-4`}
              >
                <div className="leading-normal font-medium">
                  <div className="flex items-center justify-center gap-1">
                    <FaUserGroup />
                    {course.level}
                  </div>
                </div>
                <div className="text-center font-medium">
                  {course.lessionNumber}
                  <div className="flex items-center justify-center gap-1">
                    <PiTreeStructureFill /> {course.lessonCount} Lessons
                  </div>
                </div>
              </section>
            </div>
          ))}
        </div>
        {/* CTA Buttons */}
        <div className="flex gap-6">
          <CtaButton primaryButton={true} linkTo="/signup">
            <div className="flex items-center gap-1">
              Explore Full Catalog <FaArrowRight className="h-4 w-4" />
            </div>
          </CtaButton>
          <CtaButton primaryButton={false} linkTo="/signup">
            Learn More
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
