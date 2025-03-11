import ContactForm from "../components/core/AboutPage/ContactForm";
import Footer from "../components/common/Footer";
import HighlightText from "../components/core/HomePage/HighlightText";
import React from "react";
import ReviewSlider from "../components/core/AboutPage/ReviewSlider";
import WorldClassLearningSection from "../components/core/AboutPage/WorldClassLearningSection";
import { aboutPageMetrics } from "../data/aboutPageData";
import aboutUs1 from "../assets/media/aboutUs1.webp";
import aboutUs2 from "../assets/media/aboutUs2.webp";
import aboutUs3 from "../assets/media/aboutUs3.webp";
import aboutUsFoundingStory from "../assets/media/aboutUsFoundingStory.png";

export default function About() {
  return (
    // wrapper
    <div className="bg-richblack-900 relative flex h-full w-full flex-col">
      {/*Section 1 grey background*/}
      <section className="bg-richblack-800 w-full pt-20 pb-50">
        <div className="relative mx-auto flex w-11/12 flex-col items-center gap-12">
          {/* title and sub-title */}
          <div className="flex flex-col items-center justify-center gap-3 px-12 text-center">
            <p className="text-richblack-200 font-medium">About us</p>
            <span className="text-richblack-5 text-4xl font-semibold">
              Empowering the Future of Online Learning Through
            </span>

            <div className="text-richblack-5 text-4xl font-semibold">
              <HighlightText text="Innovation and Technology" />
            </div>
            <p className="text-richblack-300 font-medium">
              At Studynotion, we are revolutionizing online education by
              blending innovation with accessibility. Our mission is to empower
              learners worldwide with cutting-edge courses, hands-on learning
              experiences, and a thriving community that fosters growth. By
              leveraging emerging technologies and industry insights, we ensure
              that education is not just informative but also transformative.
            </p>
          </div>
          {/* images */}
          <div className="absolute top-80 grid grid-cols-3 grid-rows-1 gap-6">
            <img src={aboutUs1} alt="" />
            <img src={aboutUs2} alt="" />
            <img src={aboutUs3} alt="" />
          </div>
        </div>
      </section>

      {/*Section 2 black background*/}
      <section className="bg-richblack-900 w-full">
        <div className="mx-auto flex w-11/12 flex-col items-center pt-40">
          {/* quote */}
          <span className="text-richblack-100 text-center text-3xl leading-12 font-semibold">
            <span className="text-richblack-500">"</span> We are committed to
            transforming the learning experience through innovation. Our
            cutting-edge platform seamlessly integrates
            <HighlightText text="technology," gradient="blue" />
            <HighlightText text="expert-driven content," gradient="orange" />
            and a thriving community to deliver a
            <HighlightText
              text="dynamic and immersive education"
              gradient="yellow"
            />
            like never before. <span className="text-richblack-500">"</span>
          </span>
          {/* dividing faded line */}
          <div className="border-richblack-800 my-10 w-screen border"> </div>
          {/* our founding story */}
          <section className="grid grid-cols-2 items-center gap-20">
            {/* text container */}
            <div className="flex flex-col gap-6 py-20 text-3xl leading-11 font-semibold">
              <HighlightText text="Our Founding Story" gradient="blue2" />
              <div className="text-richblack-300 flex flex-col gap-4 text-base font-medium">
                <p>
                  Our e-learning platform was born out of a shared vision and
                  passion for transforming education. It all began with a group
                  of educators, technologists, and lifelong learners who
                  recognized the need for accessible, flexible, and high-quality
                  learning opportunities in a rapidly evolving digital world.
                </p>
                <p>
                  As experienced educators ourselves, we witnessed firsthand the
                  limitations and challenges of traditional education systems.
                  We believed that education should not be confined to the walls
                  of a classroom or restricted by geographical boundaries. We
                  envisioned a platform that could bridge these gaps and empower
                  individuals from all walks of life to unlock their full
                  potential.
                </p>
              </div>
            </div>
            {/* image container */}
            <div>
              <img src={aboutUsFoundingStory} alt="" />
            </div>
          </section>
          {/* vision and mission section */}
          <section className="grid grid-cols-2 items-center gap-20">
            {/* our vision text container */}
            <div className="flex flex-col gap-6 text-3xl leading-11 font-semibold">
              <HighlightText text="Our Vision" gradient="yellow" />
              <div className="text-richblack-300 flex flex-col gap-4 text-base font-medium">
                <p>
                  Our e-learning platform was born out of a shared vision and
                  passion for transforming education. It all began with a group
                  of educators, technologists, and lifelong learners who
                  recognized the need for accessible, flexible, and high-quality
                  learning opportunities in a rapidly evolving digital world.
                </p>
              </div>
            </div>
            {/* our mission text container */}
            <div className="flex flex-col gap-6 py-20 text-3xl leading-11 font-semibold">
              <HighlightText text="Our Mission" gradient="red" />
              <div className="text-richblack-300 flex flex-col gap-4 text-base font-medium">
                <p>
                  Our mission goes beyond just delivering courses online. We
                  wanted to create a vibrant community of learners, where
                  individuals can connect, collaborate, and learn from one
                  another. We believe that knowledge thrives in an environment
                  of sharing and dialogue, and we foster this spirit of
                  collaboration through forums, live sessions, and networking
                  opportunities.
                </p>
              </div>
            </div>
          </section>
        </div>
        {/* metrics section */}
        <section className="bg-richblack-700 grid w-full grid-cols-4 gap-2 py-20">
          {aboutPageMetrics.map((metric, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-3"
            >
              <p className="text-richblack-5 text-3xl font-bold">
                {metric.number}
              </p>
              <p className="text-richblack-500 font-semibold">{metric.text}</p>
            </div>
          ))}
        </section>
        <WorldClassLearningSection />
        <section className="mx-auto flex w-1/2 flex-col gap-8 py-20">
          <div className="flex flex-col items-center gap-3">
            <p className="text-richblack-5 text-4xl font-semibold">
              Get in Touch
            </p>
            <p className="text-richblack-300 font-medium">
              We’d love to here for you, Please fill out this form.
            </p>
          </div>
          <ContactForm />
        </section>

        <ReviewSlider />
      </section>
      <Footer />
    </div>
  );
}
