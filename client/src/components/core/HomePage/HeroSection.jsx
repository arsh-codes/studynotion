import { Link } from "react-router-dom";
import homeSection1Video from "../../../assets/media/homeSection1Video.mp4";
import Video1Eclipse from "../../../assets/media/homepageVideo1Eclipse.svg";
import { FaArrowRight } from "react-icons/fa";
import CtaButton from "../../../components/core/HomePage/CtaButton";
import HighlightText from "../../../components/core/HomePage/HighlightText";

const HeroSection = () => {
  return (
    <div className="mx-auto w-11/12">
      <div className="mx-auto flex flex-col items-center gap-[38px]">
        {/* Become an instructor button */}
        <Link to={"/signup"}>
          <div className="mx-auto flex w-fit items-center justify-center gap-1 rounded-full bg-richblack-800 px-5 py-2 text-center text-base font-medium text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:bg-richblack-900">
            <p>Become an Instructor</p>
            <FaArrowRight className="h-4 w-4" />
          </div>
        </Link>
        {/* Heading */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-4xl font-semibold leading-[44px] text-richblack-5">
            Empower Your Future with
            <HighlightText text="Coding Skills" />
          </h2>
          <span className="text-balance text-center text-base font-medium text-richblack-300">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </span>
        </div>
        <div className="flex gap-6">
          <CtaButton primaryButton={true} linkTo="/signup">
            Learn More
          </CtaButton>
          <CtaButton primaryButton={false} linkTo="/signup">
            Book a Demo
          </CtaButton>
        </div>
      </div>

      {/* Background light eclipse for video */}
      <div className="absolute top-48 z-0">
        <img src={Video1Eclipse} alt="Eclipse shade behind video" />
      </div>

      {/* Video */}
      <div className="relative z-10 mx-auto mt-14 h-[515px] w-[1035px] shadow-lg">
        <video autoPlay muted loop className="h-full w-full">
          <source src={homeSection1Video} type="video/mp4" />
          {/* Adding fallback text within the video tag for browsers that do not support the video element */}
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HeroSection;
