import HighlightText from "./HighlightText";
import CtaButton from "./CtaButton";
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import { HomePageExploreCourses } from "../../../data/homePageExploreCourses";
import { FaUserGroup } from "react-icons/fa6";
import { PiTreeStructureFill } from "react-icons/pi";
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

  return (
    <div className="relative">
      <div className="h-[28rem]"></div>
      <div className="absolute -top-0 mx-auto flex w-11/12 select-none flex-col items-center justify-center gap-20 px-28">
        {/* Title and Subtitle */}
        <div className="flex flex-col items-center justify-center gap-2">
          <h3 className="text-4xl font-semibold leading-[44px] text-richblack-5">
            Unlock the
            <HighlightText text="Power of Code" />
          </h3>
          <p className="text-center font-medium text-richblack-300">
            Learn to Build Anything You Can Imagine
          </p>
        </div>
        {/* Tabs */}
        <div className="flex gap-9 rounded-full bg-richblack-800 p-1">
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
        eeeee
        {/* Cards */}
        <div className="flex gap-9">
          {linkedCourses.map((course, index) => (
            <div
              key={index}
              className={`relative flex h-72 w-1/3 flex-col gap-3 px-6 pb-[52px] pt-8 ${
                selectedCourse === course
                  ? "bg-pure-greys-5 shadow-[12px_12px_0px_0px_rgba(255,214,10,1.00)]"
                  : "bg-richblack-800 hover:scale-105 hover:shadow-xl"
              } shadow-lg transition-transform duration-300`}
              onClick={() => setSelectedCourse(course)}
            >
              <div
                className={`text-xl font-semibold leading-7 ${selectedCourse === course ? "text-richblack-800" : "text-richblack-25"} `}
              >
                {course.heading}
              </div>
              <div
                className={`font-normal leading-normal ${selectedCourse === course ? "text-richblack-500" : "text-richblack-400"} `}
              >
                {course.description}
              </div>

              {/* Footer Section */}
              <section
                className={`absolute bottom-0 left-0 right-0 flex justify-between border-t ${selectedCourse === course ? "border-richblack-50 text-blue-500" : "border-richblack-600 text-richblack-300"} px-6 py-4`}
              >
                <div className="font-medium leading-normal">
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
    </div>
  );
}
