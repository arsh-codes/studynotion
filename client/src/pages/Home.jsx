import { FaArrowRight } from "react-icons/fa";
import React from "react";

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
            Empower Your Future with Coding Skills
          </span>
          <span class="text-center text-base font-medium text-[#838894]">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.{" "}
          </span>
        </div>
        <div class="flex gap-6">
          <div class="flex items-center gap-2 rounded-lg bg-[#ffd60a] px-6 py-3">
            <span class="text-center text-base font-medium text-[#000814]">
              Learn More
            </span>
          </div>
          <div class="flex items-center gap-2 rounded-lg bg-[#161d29] px-6 py-3">
            <span class="text-center text-base font-medium text-[#f1f2ff]">
              Book a Demo
            </span>
          </div>
        </div>
      </div>
      {/* Section 2 */}
      {/* Section 3 */}
      {/* Section 4 */}
    </div>
  );
};

export default Home;
