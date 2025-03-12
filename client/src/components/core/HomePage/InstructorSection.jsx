import CtaButton from "@components/core/HomePage/CtaButton";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "@components/core/HomePage/HighlightText";
import homepageInstructor from "@assets/media/homepageInstructor.jpg";

const InstructorSection = () => {
  return (
    <div className="mx-auto flex w-11/12 flex-col gap-8 px-4 py-8 md:flex-row-reverse md:items-center md:gap-20">
      {/* Right text container */}
      <div className="flex flex-col gap-3 md:w-1/2">
        <h4 className="text-richblack-5 text-3xl font-semibold md:text-4xl md:leading-[44px]">
          <div>Become an</div>
          <HighlightText text="instructor" spaceBefore={false} />
        </h4>
        <p className="text-richblack-300 font-medium">
          Instructors from around the world teach millions of students on
          StudyNotion. We provide the tools and skills to teach what you love.
        </p>
        <div className="pt-4 md:pt-12">
          <CtaButton primaryButton={true} linkTo="/signup">
            <div className="flex items-center gap-1">
              Start Teaching Today <FaArrowRight />
            </div>
          </CtaButton>
        </div>
      </div>
      {/* Left image container */}
      <div className="md:w-1/2">
        <img
          className="relative object-cover"
          src={homepageInstructor}
          alt="Instructor teaching students"
        />
      </div>
    </div>
  );
};

export default InstructorSection;
