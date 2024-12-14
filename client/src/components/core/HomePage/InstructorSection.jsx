import CtaButton from "./CtaButton";
import HighlightText from "./HighlightText";
import { FaArrowRight } from "react-icons/fa";
import instructorImage from "../../../assets/media/instructorImage.png";

const InstructorSection = () => {
  return (
    <div className="mx-auto flex w-11/12 items-center gap-20 px-[120px] py-[90px]">
      {/* Left image container */}
      <div className="w-1/2">
        <img
          className="relative object-cover"
          src={instructorImage}
          alt="Instructor teaching students" 
        />
      </div>
      {/* Right text container */}
      <div className="flex w-1/2 flex-col gap-3">
        <h4 className="text-4xl font-semibold leading-[44px] text-richblack-5">
          <div>Become an</div>
          <HighlightText text="instructor" spaceBefore={false} />
        </h4>
        <p className="text-base font-medium leading-normal text-richblack-300">
          Instructors from around the world teach millions of students on
          StudyNotion. We provide the tools and skills to teach what you love.
        </p>
        <div className="pt-12">
          <CtaButton primaryButton={true} linkTo="/signup">
            Start Teaching Today <FaArrowRight className="h-4 w-4" />
          </CtaButton>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
