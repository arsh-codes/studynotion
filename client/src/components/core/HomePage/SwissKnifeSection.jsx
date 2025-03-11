import CtaButton from "./CtaButton";
import HighlightText from "./HighlightText";
import compareWithOthersImage from "../../../assets/media/compareWithOthersImage.png";
import knowYourProgressImage from "../../../assets/media/knowYourProgressImage.png";
import planYourLessonsImage from "../../../assets/media/planYourLessonsImage.png";

const SwissKnifeSection = () => {
  return (
    <section className="mx-auto flex w-11/12 flex-col items-center gap-12 py-8 md:py-20">
      <div className="flex flex-col items-center gap-3">
        <h3 className="text-3xl leading-[44px] font-semibold text-[#000814] md:text-4xl">
          Your swiss knife for
          <HighlightText text="learning any language" />
        </h3>
        <p className="text-richblack-700 text-base font-medium text-balance md:text-center">
          Learning multiple languages made easy with 20+ languages, realistic
          voice-overs, progress tracking, custom schedules, interactive
          exercises, personalized feedback, and gamified experiences to keep you
          motivated and engaged.
        </p>
      </div>
      <div className="bg-pure-greys-5 flex flex-col items-center justify-center md:flex-row">
        <img
          src={knowYourProgressImage}
          alt="Progress tracking"
          className="z-0 md:-mr-36 md:-translate-y-6"
        />
        <img
          src={compareWithOthersImage}
          alt="Compare progress with others"
          className="z-10"
        />
        <img
          src={planYourLessonsImage}
          alt="Plan your lessons"
          className="z-20 md:-ml-36"
        />
      </div>
      <CtaButton primaryButton={true} linkTo="/signup" text={"Learn More"} />
    </section>
  );
};

export default SwissKnifeSection;
