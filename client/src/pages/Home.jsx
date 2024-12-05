import { FaArrowRight } from "react-icons/fa";
import React from "react";
import CTAButton from "../components/HomePage/CTAButton";
import HighlightText from "../components/HomePage/HighlightText";
import bannerVideo from "../assets/media/bannerVideo.mp4";

const Home = () => {
  return (
    <div>
      <div class="flex flex-col items-center gap-[38px]">
        {/* Section 1 */}

        <div class="flex gap-[5px] rounded-[500px] bg-[#161d29] p-1">
          <div class="flex items-center gap-2.5 rounded-[100px] px-[18px] py-1.5">
            <span class="text-center text-base font-medium text-[#999daa]">
              Become an Instructor
            </span>
            <div class="h-4 w-4">
              <FaArrowRight />
            </div>
          </div>
        </div>
        <div class="flex w-[913px] flex-col items-center gap-4">
          <span class="text-center text-[36px] font-semibold leading-[44px]">
            Empower Your Future with
            <HighlightText text="Coding Skills"></HighlightText>
          </span>
          <span class="text-center text-base font-medium text-[#838894]">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.{" "}
          </span>
        </div>
        <div class="flex gap-6">
          <CTAButton primaryButton={true}>Learn More</CTAButton>
          <CTAButton primaryButton={false}>Book a Demo</CTAButton>
        </div>
        <div className="h-[515px] w-[1035px]">
          <video autoPlay muted loop className="h-full w-full">
            <source src={bannerVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      {/* Code Section 1 */}
      {/* Code Section 2 */}

      {/* Section 2 */}
      {/* Section 3 */}
      {/* Section 4 */}
    </div>
  );
};

export default Home;
