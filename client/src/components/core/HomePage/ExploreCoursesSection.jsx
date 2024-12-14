// import { useState } from "react";
import HighlightText from "./HighlightText";
import CtaButton from "./CtaButton";
import { FaArrowRight } from "react-icons/fa";
// import { HomePageExploreCourses } from "../../../data/homePageExploreCourses";
const tabNames = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];
export default function ExploreCoursesSection() {
  //   const [currentTab, setCurrentTab] = useState(tabNames[0]);
  //   const [courses, setCourses] = useState(HomePageExploreCourses[0]);
  //   const [clickedCard, setClickedCard] = useState(
  //     HomePageExploreCourses[0].courses[0].heading,
  //   );

  return (
    <div className="mx-auto flex w-11/12 flex-col items-center justify-center gap-20 bg-richblack-900 px-28 py-20">
      <div className="flex-col items-center justify-center gap-4">
        <h3 className="text-4xl font-semibold leading-[44px] text-richblack-5">
          Unlock the
          <HighlightText text="Power of Code" />
        </h3>
        <p className="text-center text-base font-medium text-richblack-300">
          Learn to Build Anything You Can Imagine
        </p>
      </div>
      <div className="flex gap-9">
        {tabNames.map((element, index) => (
          <div
            className="cursor-pointer rounded-lg px-6 py-2 text-base font-medium text-richblack-300 transition-colors hover:bg-richblack-700 hover:text-richblack-5"
            key={index}
          >
            {element}
          </div>
        ))}
      </div>
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
  );
}
