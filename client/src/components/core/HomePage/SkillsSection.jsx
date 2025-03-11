import CtaButton from "./CtaButton";
import HighlightText from "./HighlightText";
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
    <section className="mx-auto flex w-11/12 flex-col items-center justify-center gap-12 px-4 py-8 md:px-28">
      {/* Heading */}
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Left part */}
        <div className="text-3xl font-semibold md:text-4xl md:leading-[44px]">
          Get the skills you need for a
          <HighlightText text="job that is in demand." />
        </div>
        {/* Right part */}
        <div className="text-richblack-700 flex flex-col gap-12 text-base font-medium">
          <p>
            The modern StudyNotion dictates its own terms. Today, being a
            competitive specialist requires more than just professional skills.
          </p>
          <CtaButton
            primaryButton={true}
            linkTo="/signup"
            text={"Learn More"}
          />
        </div>
      </div>

      {/* Skills flex box */}
      <div className="flex flex-col gap-16 md:items-center lg:flex-row">
        {/* Left side skills Badges*/}
        <div className="flex flex-col gap-8">
          {skillBadgesData.map((element, index) => (
            <div className="relative flex gap-6 px-3 py-4" key={index}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white p-1 shadow">
                <img
                  src={element.logo}
                  alt={`Logo for ${element.heading} skill`}
                />
              </div>
              <div className="flex flex-col">
                <h4 className="text-richblack-800 text-lg leading-6 font-semibold">
                  {element.heading}
                </h4>
                <p className="text-richblack-700 text-sm leading-5 font-normal">
                  {element.subHeading}
                </p>
              </div>
              {/* Add dotted line if not the last element */}
              {index !== skillBadgesData.length - 1 ? (
                <div className="border-richblack-50 absolute h-[0px] w-[42px] origin-top-left translate-x-6 translate-y-14 rotate-90 border border-dotted"></div>
              ) : null}
            </div>
          ))}
        </div>

        {/* Right side image */}
        <div className="relative">
          <img
            src={skillSectionImage}
            className="hidden h-[30rem] w-[47rem] object-cover md:block"
            alt="Skills Section Image"
          />

          <div className="bg-caribbeangreen-700 flex flex-col gap-12 p-10 md:absolute md:flex-row lg:translate-x-[15%] lg:-translate-y-1/2">
            <div className="flex flex-row items-center justify-center gap-6">
              <span className="text-4xl leading-[44px] font-bold text-white">
                10
              </span>
              <span className="text-caribbeangreen-300 text-sm leading-5 font-medium">
                <p>YEARS</p> <p>EXPERIENCE</p>
              </span>
            </div>
            {/* Line */}
            <div className="border-caribbeangreen-300 h-[0px] origin-top-left border md:w-11 md:rotate-90"></div>
            <div className="flex items-center justify-center gap-6">
              <span className="text-center text-4xl leading-[44px] font-bold text-white">
                250
              </span>
              <span className="text-caribbeangreen-300 text-sm leading-5 font-medium">
                TYPES OF <p>COURSES</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
