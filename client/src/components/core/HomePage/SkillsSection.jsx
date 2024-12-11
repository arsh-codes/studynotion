import React from "react";
import HighlightText from "./HighlightText";
import CtaButton from "./CtaButton";
import Logo1 from "../../../assets/homePageSkillsSectionLogos/Logo1.svg";
import Logo2 from "../../../assets/homePageSkillsSectionLogos/Logo2.svg";
import Logo3 from "../../../assets/homePageSkillsSectionLogos/Logo3.svg";
import Logo4 from "../../../assets/homePageSkillsSectionLogos/Logo4.svg";
import skillSectionImage from "../../../assets/media/skillsSectionImage.png";
const skillBadgesData = [
  {
    logo: Logo1,
    heading: "Leadership",
    subHeading:
      "Dedicated to driving company success through strategic guidance and support.",
  },
  {
    logo: Logo2,
    heading: "Responsibility",
    subHeading: "Prioritizing students' needs to foster growth and excellence.",
  },
  {
    logo: Logo3,
    heading: "Flexibility",
    subHeading:
      "Adapting seamlessly to changes and challenges with resilience.",
  },
  {
    logo: Logo4,
    heading: "Problem-Solving",
    subHeading: "Leveraging innovative coding to develop effective solutions.",
  },
];

const SkillsSection = () => {
  return (
    <section className="mx-auto flex w-11/12 flex-col items-center justify-center gap-12 px-28 py-20">
      {/* Heading */}
      <div className="flex gap-3">
        {/*Left part */}
        <div className="text-4xl font-semibold leading-[44px]">
          Get the skills you need for a
          <HighlightText text="job that is in demand." />{" "}
        </div>
        {/* Right part */}
        <div className="flex flex-col gap-12 text-base font-medium text-richblack-700">
          <p>
            The modern StudyNotion is the dictates its own terms. Today, to be a
            competitive specialist requires more than professional skills.
          </p>
          <CtaButton primaryButton={true} linkTo="/signup">
            Learn More
          </CtaButton>
        </div>
      </div>

      {/* Skills flex box */}
      <div className="flex">
        {/* Left side skills Badges*/}
        <div class="flex flex-col gap-8">
          {skillBadgesData.map((element, index) => {
            return (
              <div className="flex gap-6 px-3 py-4" key={index}>
                <div className="h-6 w-6 p-1">
                  <img src={element.logo} alt="Logo for skill badge" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[18px] font-semibold leading-[26px] text-[#161d29]">
                    {element.heading}
                  </h4>
                  <p className="text-[14px] font-normal leading-[22px] text-[#2c333f]">
                    {element.subHeading}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right side image */}
        <div className="relative">
          <img src={skillSectionImage} alt="" />

          <span className="absolute flex -translate-y-1/2 translate-x-[15%] gap-12 bg-caribbeangreen-700 p-10">
            <div class="flex items-center justify-center gap-6">
              <span class="text-4xl font-bold leading-[44px] text-white">
                10
              </span>
              <span class="text-sm font-medium leading-5 text-caribbeangreen-300">
                <p>YEARS</p> <p>EXPERIENCE</p>
              </span>
            </div>
            <div className="h-[0px] w-11 origin-top-left rotate-90 border border-caribbeangreen-300"></div>
            <div class="flex items-center gap-6">
              <span class="text-center text-4xl font-bold leading-[44px] text-white">
                250
              </span>
              <span class="text-sm font-medium leading-5 text-caribbeangreen-300">
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
