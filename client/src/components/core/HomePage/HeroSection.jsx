import CtaButton from "@components/core/HomePage/CtaButton";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "@components/core/HomePage/HighlightText";
import { Link } from "react-router-dom";
import Video1Eclipse from "@assets/media/homepageVideo1Eclipse.svg";
import homeSection1Video from "@assets/media/homeSection1Video.mp4";

const HeroSection = () => {
  return (
    <div className="mx-auto w-11/12 px-4 py-8">
      <div className="flex flex-col gap-9 lg:mx-auto lg:items-center">
        {/* Become an instructor button */}
        <Link to={"/signup"}>
          <div className="bg-richblack-800 text-richblack-200 hover:bg-richblack-900 flex w-fit items-center justify-center gap-1 rounded-full px-5 py-2 text-center text-base font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 lg:mx-auto">
            <p>Become an Instructor</p>
            <FaArrowRight className="h-4 w-4" />
          </div>
        </Link>

        {/* Heading */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-richblack-5 text-3xl leading-[44px] font-semibold lg:text-4xl">
            Empower Your Future with
            <HighlightText text="Coding Skills" />
          </h2>
          <span className="text-richblack-300 text-base font-medium lg:text-center lg:text-balance">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="mx-auto flex gap-6 lg:mx-0">
          <CtaButton text="Learn More" primaryButton />
          <CtaButton text="Book a Demo" />
        </div>
      </div>

      {/* Background light eclipse for video */}
      <div className="absolute top-48 z-0">
        <img src={Video1Eclipse} alt="Eclipse shade behind video" />
      </div>

      {/* Video */}
      <div className="relative z-10 mx-auto mt-14 h-[90%] w-[90%] overflow-hidden shadow-lg md:h-[80%] md:w-[80%] lg:rounded-lg">
        <video autoPlay muted loop className="h-full w-full">
          <source src={homeSection1Video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HeroSection;
