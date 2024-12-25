import CtaButton from "./CtaButton";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import PropTypes from "prop-types";
const CodeSection = ({
  position,
  backgroundGradient,
  heading,
  subHeading,
  ctaButton1,
  ctaButton2,
  codeColor,
  codeToAnimate,
}) => {
  // Calculate the number of lines in the code
  const numberOfLines = codeToAnimate.split("\n").length + 2;

  return (
    <div
      className={`flex ${position} h-fit w-full gap-6 py-24 sm:px-6 md:px-12 lg:px-28`}
    >
      {/* Text Section */}
      <section className="m-auto flex w-full flex-col gap-3 md:w-1/2">
        {heading}
        <span className="text-balance text-base font-medium text-richblack-300">
          {subHeading}
        </span>
        <div className="flex gap-6 pt-8">
          <CtaButton primaryButton={ctaButton1.primaryButton} linkTo={"/"}>
            <div className="flex items-center gap-1">
              {ctaButton1.text} <FaArrowRight />
            </div>
          </CtaButton>
          <CtaButton primaryButton={ctaButton2.primaryButton} linkTo={"/"}>
            {ctaButton2.text}
          </CtaButton>
        </div>
      </section>

      {/* Animation Section */}
      <section className="relative flex h-fit w-full p-8 md:w-1/2">
        {backgroundGradient}
        {/* Numbered Block */}
        <div className="w-[15%] text-center text-base font-medium text-richblack-300">
          {Array.from({ length: numberOfLines }, (_, i) => (
            <p key={i} className="text-xs sm:text-sm">
              {i + 1}
            </p>
          ))}
        </div>

        {/* Animated Code Block */}
        <div className={`w-[85%] text-base font-medium ${codeColor}`}>
          <TypeAnimation
            sequence={[
              codeToAnimate, // The code animation sequence
              5000, // Delay in milliseconds before restarting
              "", // Clear screen for a break
            ]}
            omitDeletionAnimation={true}
            wrapper="span"
            cursor
            speed={50} // Typing speed
            repeat={Infinity} // Infinite loop
            style={{
              fontFamily: "Courier New, monospace",
              display: "block",
              whiteSpace: "pre-wrap", // Preserve formatting
              color: codeColor,
            }}
          />
        </div>
      </section>
    </div>
  );
};
CodeSection.propTypes = {
  position: PropTypes.string,
  backgroundGradient: PropTypes.node,
  heading: PropTypes.node.isRequired,
  subHeading: PropTypes.string.isRequired,
  ctaButton1: PropTypes.shape({
    primaryButton: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  ctaButton2: PropTypes.shape({
    primaryButton: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  codeColor: PropTypes.string,
  codeToAnimate: PropTypes.string.isRequired,
};

export default CodeSection;
