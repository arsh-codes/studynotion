import HighlightText from "../components/core/HomePage/HighlightText";
import homeSec2Bg from "../assets/media/homeSec2Bg.svg";

import HeroSection from "../components/core/HomePage/HeroSection";
import CodeSection from "../components/core/HomePage/CodeSection";
import ExploreCoursesSection from "../components/core/HomePage/ExploreCoursesSection";
import SkillsSection from "../components/core/HomePage/SkillsSection";
import SwissKnifeSection from "../components/core/HomePage/SwissKnifeSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ReviewsSection from "../components/core/HomePage/ReviewsSection";
import Footer from "../components/common/Footer";
const Home = () => (
  // Wrapper
  <div className="relative flex h-full w-full flex-col">
    {/*Section 1 Black background*/}
    <section className="bg-richblack-900">
      <HeroSection />
      <section className="mx-auto w-11/12 px-4 py-8">
        <CodeSection
          smVisibility="flex"
          position="flex-row"
          backgroundGradient={
            <div className="codeblock1-background-gradient absolute"></div>
          }
          heading={
            <h3 className="text-richblack-5 text-4xl leading-[44px] font-semibold">
              Unlock your
              <HighlightText text="coding potential" gradient="orange" />
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
          smVisibility="hidden"
          position="flex-row-reverse"
          backgroundGradient={
            <div className="codeblock2-background-gradient absolute"></div>
          }
          heading={
            <h3 className="text-richblack-5 text-4xl leading-[44px] font-semibold">
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
      </section>
      <ExploreCoursesSection />
    </section>

    {/*Section 2 Grey background*/}
    {/* !!!!!!!FIXX THIS LATER!!!!!! */}
    <section className="bg-pure-greys-5 mt-[25rem] md:mt-[15rem] lg:-mt-22">
      <div
        className="mx-auto flex h-80 w-full items-center justify-center gap-6"
        style={{ background: `url(${homeSec2Bg})` }}
      ></div>
      <SkillsSection />
      <SwissKnifeSection />
    </section>

    {/* Section 3 dark background */}
    <section className="bg-richblack-900">
      {/* Become an instructor */}
      <InstructorSection />
      <ReviewsSection />
    </section>
    <Footer />
  </div>
);

export default Home;
