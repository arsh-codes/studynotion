import { FaArrowRight } from "react-icons/fa";
import CtaButton from "../components/core/HomePage/CtaButton";
import HighlightText from "../components/core/HomePage/HighlightText";
import homeSection1Video from "../assets/media/homeSection1Video.mp4";
import Video1Eclipse from "../assets/media/homepageVideo1Eclipse.svg";
import CodeSection from "../components/core/HomePage/CodeSection";
import { Link } from "react-router-dom";
import homeSec2Bg from "../assets/media/homeSec2Bg.svg";
import SkillsSection from "../components/core/HomePage/SkillsSection";
import SwissKnifeSection from "../components/core/HomePage/SwissKnifeSection";
const Home = () => (
  // Wrapper
  <div className="relative flex h-full w-full flex-col">
    {/*Section 1 Black background*/}
    <section className="bg-richblack-900">
      <div className="mx-auto w-11/12">
        <div className="mx-auto flex flex-col items-center gap-[38px]">
          {/* Become an instructor button */}
          <Link to={"/signup"}>
            <div className="mx-auto flex w-fit items-center justify-center gap-1 rounded-full bg-richblack-800 px-5 py-2 text-center text-base font-medium text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight className="h-4 w-4" />
            </div>
          </Link>
          {/* Heading */}
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-4xl font-semibold leading-[44px] text-richblack-5">
              Empower Your Future with
              <HighlightText text="Coding Skills" />
            </h2>
            <span className="text-balance text-center text-base font-medium text-richblack-300">
              With our online coding courses, you can learn at your own pace,
              from anywhere in the world, and get access to a wealth of
              resources, including hands-on projects, quizzes, and personalized
              feedback from instructors.
            </span>
          </div>
          <div className="flex gap-6">
            <CtaButton primaryButton={true} linkTo="/signup">
              Learn More
            </CtaButton>
            <CtaButton primaryButton={false} linkTo="/signup">
              Book a Demo
            </CtaButton>
          </div>
        </div>

       {/* Background light eclipse for video */}
<div className="absolute top-48 z-0">
  <img src={Video1Eclipse} alt="Eclipse shade behind video" />
</div>

{/* Video */}
<div className="relative z-10 mx-auto mt-14 h-[515px] w-[1035px] shadow-lg">
  <video autoPlay muted loop className="h-full w-full">
    <source src={homeSection1Video} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

        <CodeSection
          position="flex-row"
          backgroundGradient={
            <div className="codeblock1-background-gradient absolute"></div>
          }
          heading={
            <h3 className="text-4xl font-semibold leading-[44px] text-richblack-5">
              Unlock your
              <HighlightText text="coding potential " />
              with our online courses.
            </h3>
          }
          subHeading="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          ctaButton1={{ primaryButton: true, text: "Try it Yourself" }}
          ctaButton2={{ primaryButton: false, text: "Learn More" }}
          codeColor="text-caribbeangreen-5"
          codeToAnimate={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport"\n<title>\nLet's Make Something Special</title>\n...`}
        />
        <CodeSection
          position="flex-row-reverse"
          backgroundGradient={
            <div className="codeblock2-background-gradient absolute"></div>
          }
          heading={
            <h3 className="text-4xl font-semibold leading-[44px] text-richblack-5">
              Start
              <HighlightText text="coding in seconds " />
            </h3>
          }
          subHeading="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
          ctaButton1={{ primaryButton: true, text: "Continue Lesson" }}
          ctaButton2={{ primaryButton: false, text: "Learn More" }}
          codeColor="text-yellow-5"
          codeToAnimate={`def greet(name):\n    print(f"Hello, {name}!")\n    print("Start coding in seconds...")\n    \nif __name__ == "__main__":\n    # Greet the user\n    greet("Alice")\n...`}
        />
      </div>
    </section>

    {/*Section 2 Grey background*/}
    <section className="bg-pure-greys-5">
      <div
        className="mx-auto flex h-80 w-full items-center justify-center gap-6"
        style={{ background: `url(${homeSec2Bg})` }}
      >
        <CtaButton primaryButton={true} linkTo="/signup">
          <div className="flex items-center gap-1">
            Explore Full Content <FaArrowRight />
          </div>
        </CtaButton>
        <CtaButton primaryButton={false} linkTo="/signup">
          Learn More
        </CtaButton>
      </div>
      <SkillsSection />
      <SwissKnifeSection />
    </section>
  </div>
);

export default Home;
