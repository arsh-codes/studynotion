import React from "react";
import CtaButton from "./CtaButton";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeSection = ({
  position,
  heading,
  subHeading,
  ctaButton1,
  ctaButton2,
  codeToAnimate,
}) => {
  // Calculate the number of lines in the code
  const numberOfLines = codeToAnimate.split("\n").length + 2;
  console.log("📝 -> numberOfLines=", numberOfLines);

  return (
    <div
      className={`flex ${position || "flex-row"} h-fit w-full gap-24 px-28 py-24`}
    >
      {/* Text Section */}
      <section className="m-auto flex w-1/2 flex-col gap-3">
        {heading}
        <span className="text-balance text-base font-medium text-richblack-300">
          {subHeading}
        </span>
        <div className="flex gap-6 pt-[52px]">
          <CtaButton primaryButton={ctaButton1.primaryButton} linkTo={"/"}>
            {ctaButton1.text} <FaArrowRight />
          </CtaButton>
          <CtaButton primaryButton={ctaButton2.primaryButton} linkTo={"/"}>
            {ctaButton2.text}
          </CtaButton>
        </div>
      </section>

      {/* Animation Section */}
      <section className="flex h-fit w-1/2 p-8">
        {/* Numbered Block */}
        <div className="w-[10%] text-center text-base font-medium text-richblack-300">
          {Array.from({ length: numberOfLines }, (_, i) => (
            // Create an array of length 'numberOfLines', using the index 'i'.
            // Display 'i + 1' as the content of each <p> tag to show 1-based indexing.
            <p>{i + 1}</p>
          ))}
        </div>

        {/* Animated Code Block */}
        <div className="w-[90%] text-base font-medium text-richblack-300">
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
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default CodeSection;

{
  /* sample */
}
{
  /* <div class="flex w-[1440px] items-center justify-center gap-[98px] px-[120px] py-[90px]">
        
        <div class="flex w-[534px] flex-col gap-0.5 p-8">
          <div class="flex gap-2 self-stretch border border-solid p-2">
            <div class="flex flex-col items-center gap-0.5 px-1">
              <span class="text-center text-[14px] font-bold leading-[22px] text-[#6e727f]">
                1
              </span>
              <span class="text-center text-[14px] font-bold leading-[22px] text-[#6e727f]">
                2
              </span>
              <span class="text-center text-[14px] font-bold leading-[22px] text-[#6e727f]">
                3
              </span>
              <span class="text-center text-[14px] font-bold leading-[22px] text-[#6e727f]">
                4
              </span>
              <span class="text-center text-[14px] font-bold leading-[22px] text-[#6e727f]">
                5
              </span>
              <span class="text-center text-[14px] font-bold leading-[22px] text-[#6e727f]">
                6
              </span>
              <span class="text-center text-[14px] font-bold leading-[22px] text-[#6e727f]">
                7
              </span>
              <span class="text-center text-[14px] font-bold leading-[22px] text-[#6e727f]">
                8
              </span>
              <span class="text-center text-[14px] font-bold leading-[22px] text-[#6e727f]">
                9
              </span>
              <span class="text-center text-[14px] font-bold leading-[22px] text-[#6e727f]">
                10
              </span>
              <span class="text-center text-[14px] font-bold leading-[22px] text-[#6e727f]">
                11
              </span>
            </div>
            <div class="flex grow flex-col gap-0.5">
              <span class="text-[14px] font-bold leading-[22px] text-[#e7bc5b]">
                &lt;!DOCTYPE html&gt;
              </span>
              <span class="text-[14px] font-bold leading-[22px] text-[#c5c7d4]">
                &lt;html&gt;
              </span>
              <span class="text-[14px] font-bold leading-[22px]">
                &lt;head&gt;&lt;title&gt;Example&lt;/title&gt;&lt;link
                rel="stylesheet" href="styles.css"&gt;
              </span>
              <span class="text-[14px] font-bold leading-[22px] text-[#c5c7d4]">
                &lt;/head&gt;
              </span>
              <span class="text-[14px] font-bold leading-[22px] text-[#c5c7d4]">
                &lt;body&gt;
              </span>
              <span class="text-[14px] font-bold leading-[22px]">
                &lt;h1&gt;&lt;a href="/"&gt;Header&lt;/a&gt;&lt;/h1&gt;
              </span>
              <span class="text-[14px] font-bold leading-[22px] text-[#c5c7d4]">
                &lt;nav&gt;&lt;a href="one/"&gt;One&lt;/a&gt;&lt;a
                href="two/"&gt;Two&lt;/a&gt;&lt;a
                href="three/"&gt;Three&lt;/a&gt;&lt;/nav&gt;
              </span>
            </div>
          </div>
        </div>
      </div> */
}
