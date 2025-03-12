import CtaButton from "@components/core/HomePage/CtaButton";
import PropTypes from "prop-types";
import { TypeAnimation } from "react-type-animation";

const CodeSection = ({
  position,
  smVisibility,
  backgroundGradient,
  heading,
  subHeading,
  ctaButton1,
  ctaButton2,
  codeColor,
  codeToAnimate,
}) => {
  // Calculate the number of lines in the code
  const numberOfLines = codeToAnimate.split("\n").length + 6;

  return (
    <div
      className={`flex flex-col md:${position} ${smVisibility} h-fit w-full gap-6 sm:px-6 md:flex md:px-12 md:py-24 lg:px-28`}
    >
      {/* Text Section */}
      <section className="m-auto flex w-full flex-col gap-3 md:w-1/2">
        {heading}
        <span className="text-richblack-300 text-base font-medium text-balance">
          {subHeading}
        </span>
        <div className="flex justify-center gap-6 pt-8">
          <CtaButton
            text={ctaButton1.text}
            primaryButton={ctaButton1.primaryButton}
          />
          <CtaButton
            text={ctaButton2.text}
            primaryButton={ctaButton2.primaryButton}
          />
        </div>
      </section>

      {/* Animation Section */}
      <section className="relative flex h-fit w-full pt-4 md:w-1/2 md:p-8">
        {backgroundGradient}
        {/* Numbered Block */}
        <div className="text-richblack-300 w-[15%] text-center text-base font-medium">
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
