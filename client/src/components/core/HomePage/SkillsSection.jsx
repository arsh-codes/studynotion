import React from "react";
import HighlightText from "./HighlightText";
import CtaButton from "./CtaButton";
import Logo1 from "../../../assets/homePageSkillsSectionLogos/Logo1.svg";
import Logo2 from "../../../assets/homePageSkillsSectionLogos/Logo2.svg";
import Logo3 from "../../../assets/homePageSkillsSectionLogos/Logo3.svg";
import Logo4 from "../../../assets/homePageSkillsSectionLogos/Logo4.svg";
import skillSectionImage from "../../../assets/media/skillsSectionImage.png";

// Skill data array for easy management and scalability
const skillBadgesData = [
  {
    logo: Logo1,
    heading: "Leadership",
    subHeading: "Guiding success through support.",
  },
  {
    logo: Logo2,
    heading: "Responsibility",
    subHeading: "Fostering growth and excellence.",
  },
  {
    logo: Logo3,
    heading: "Flexibility",
    subHeading: "Adapting to change with ease.",
  },
  {
    logo: Logo4,
    heading: "Problem-Solving",
    subHeading: "Innovative solutions through coding.",
  },
];

const SkillsSection = () => {
  return (
    <section className="mx-auto flex w-11/12 flex-col items-center justify-center gap-12 px-28 py-20">
      {/* Heading */}
      <div className="flex gap-3">
        {/* Left part */}
        <div className="text-4xl font-semibold leading-[44px]">
          Get the skills you need for a
          <HighlightText text="job that is in demand." />
        </div>
        {/* Right part */}
        <div className="flex flex-col gap-12 text-base font-medium text-richblack-700">
          <p>
            The modern StudyNotion dictates its own terms. Today, being a
            competitive specialist requires more than just professional skills.
          </p>
          <CtaButton primaryButton={true} linkTo="/signup">
            Learn More
          </CtaButton>
        </div>
      </div>

      {/* Skills flex box */}
      <div className="flex items-center gap-16">
        {/* Left side skills Badges*/}
        <div className="flex flex-col gap-8">
          {skillBadgesData.map((element, index) => (
            <div className="relative flex gap-6 px-3 py-4" key={index}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white p-1 shadow">
                <img src={element.logo} alt={`Logo for ${element.heading} skill`} />
              </div>
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold leading-6 text-richblack-800">
                  {element.heading}
                </h4>
                <p className="text-sm font-normal leading-5 text-richblack-700">
                  {element.subHeading}
                </p>
              </div>
              {/* Add dotted line if not the last element */}
              {index !== skillBadgesData.length - 1 && (
                <div className="absolute h-[0px] w-[42px] origin-top-left translate-x-6 translate-y-14 rotate-90 border border-dotted border-richblack-50"></div>
              )}
            </div>
          ))}
        </div>

        {/* Right side image */}
        <div className="relative">
          <img
            src={skillSectionImage}
            className="h-[30rem] w-[47rem] object-cover"
            alt="Skills Section Image"
          />

          <span className="absolute flex -translate-y-1/2 translate-x-[15%] gap-12 bg-caribbeangreen-700 p-10">
            <div className="flex items-center justify-center gap-6">
              <span className="text-4xl font-bold leading-[44px] text-white">
                10
              </span>
              <span className="text-sm font-medium leading-5 text-caribbeangreen-300">
                <p>YEARS</p> <p>EXPERIENCE</p>
              </span>
            </div>
            <div className="h-[0px] w-11 origin-top-left rotate-90 border border-caribbeangreen-300"></div>
            <div className="flex items-center gap-6">
              <span className="text-center text-4xl font-bold leading-[44px] text-white">
                250
              </span>
              <span className="text-sm font-medium leading-5 text-caribbeangreen-300">
                TYPES OF <p>COURSES</p>
              </span>
            </div>
          </span>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
