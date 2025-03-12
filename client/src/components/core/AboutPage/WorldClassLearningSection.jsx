import CtaButton from "@components/core/HomePage/CtaButton";
import HighlightText from "@components/core/HomePage/HighlightText";
import React from "react";
import { aboutPageLearningGrid } from "@data/aboutPageData";

export default function WorldClassLearningSection() {
  return (
    <section className="mx-auto grid w-11/12 grid-cols-4 grid-rows-2 py-20">
      {/* first cell with title */}
      <div className="col-span-2 flex flex-col gap-1 pr-12">
        <span className="text-richblack-5 text-4xl font-semibold">
          World-Class Learning for
          <HighlightText text={"Anyone, Anywhere"} />
        </span>
        <p className="text-richblack-300 pb-9">
          Studynotion partners with more than 275+ leading universities and
          companies to bring flexible, affordable, job-relevant online learning
          to individuals and organizations worldwide.
        </p>
        <CtaButton text="Learn More" primaryButton={true} />
      </div>

      {aboutPageLearningGrid.map((element) => (
        <div
          key={element.id}
          className={`col-span-1 flex flex-col ${
            [1, 4, 6].includes(element.id) && "bg-richblack-700"
          } ${[2, 5].includes(element.id) && "bg-richblack-800"} gap-8 p-8`}
        >
          <p className="text-richblack-5 text-lg font-semibold">
            {element.heading}
          </p>
          <p className="text-richblack-100 text-sm">{element.description}</p>
        </div>
      ))}
    </section>
  );
}

// {
//   order: 1,
//   heading: "World-Class Learning for",
//   highlightText: "Anyone, Anywhere",
//   highlightColor: "blue",
//   description:
//     "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
//   buttonText: "Get Started",
//   buttonLink: "/get-started",
// },
