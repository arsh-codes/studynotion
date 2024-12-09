import { FaArrowRight } from "react-icons/fa";
import React from "react";
import CtaButton from "../components/core/HomePage/CtaButton";
import HighlightText from "../components/core/HomePage/HighlightText";
import BannerVideo from "../assets/media/bannerVideo.mp4";
import Video1Eclipse from "../assets/media/homepage_video1_eclipse.svg";
import CodeSection from "../components/core/HomePage/CodeSection";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="relative mx-auto flex h-full w-11/12 max-w-maxContent flex-col items-center">
    {/* SECTION 1*/}
    <div className="flex flex-col items-center gap-[38px]">
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
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
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
    <div className="absolute top-48">
      <img src={Video1Eclipse} alt="Eclipse shade behind video" />
    </div>
    {/* Video */}
    <div className="z-10 mt-14 h-[515px] w-[1035px] shadow-lg">
      <video autoPlay muted loop className="h-full w-full">
        <source src={BannerVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <CodeSection
      position="lg:flex-row"
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
      codeColor="text-yellow-50"
      codeToAnimate={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width\n,initial-scale=1.0">\n<title>\nLet's Make Something Special\n</title>\n...`}
    />
    <CodeSection
      position="lg:flex-row-reverse"
      heading={
        <h3 className="text-4xl font-semibold leading-[44px] text-richblack-5">
          Start
          <HighlightText text="coding in seconds " />
        </h3>
      }
      subHeading="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
      ctaButton1={{ primaryButton: true, text: "Continue Lesson" }}
      ctaButton2={{ primaryButton: false, text: "Learn More" }}
      codeColor="text-yellow-50"
      codeToAnimate={`def greet(name):\n    print(f"Hello, {name}!")\n    print("Start coding in seconds...")\n\n    def speak(self):\n        print(f"{self.name} the {self.species} says hello!")\n\nif __name__ == "__main__":\n    # Greet the user\n    greet("Alice")\n...`}
    />
  </div>
);

export default Home;
