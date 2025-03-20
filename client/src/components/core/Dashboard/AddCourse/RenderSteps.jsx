import { PiNumberOne, PiNumberThree, PiNumberTwo } from "react-icons/pi";

import CourseBuilder from "@components/core/Dashboard/AddCourse/CourseBuilder";
import CourseInformation from "@components/core/Dashboard/AddCourse/CourseInformation";
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import PublishCourse from "@components/core/Dashboard/AddCourse/PublishCourse";
import { useSelector } from "react-redux";

export default function RenderSteps() {
  const steps = [
    { id: 1, title: "Course Information", Icon: PiNumberOne },
    { id: 2, title: "Course Builder", Icon: PiNumberTwo },
    { id: 3, title: "Publish Course", Icon: PiNumberThree },
  ];

  const { step } = useSelector((state) => state.course);

  return (
    <div className="text-richblack-5 col-span-6 flex flex-col gap-3">
      <Link
        to={"/dashboard/my-courses"}
        className="text-richblack-300 flex items-center gap-2"
      >
        <IoIosArrowBack /> Back to Dashboard
      </Link>
      <h1 className="text-2xl font-medium">Create a new course</h1>
      {/* steps */}
      <div className="relative my-6 flex flex-row gap-1">
        {/* <div className="border absolute left-0 right-0 top-1/4 border-dashed z-0"></div> */}
        {steps.map((item) => (
          <div
            key={item.id}
            className={`flex w-1/3 flex-col text-sm ${item.id === step ? "text-yellow-50" : "text-richblack-5"} items-center gap-2`}
          >
            <div
              className={`border ${item.id === step ? "border-yellow-50" : "border-richblack-600"} ${item.id < step ? "bg-yellow-50" : "bg-richblack-700"} z-10 flex items-center justify-center rounded-full p-2`}
            >
              {item.id < step ? (
                <FaCheck className="text-richblack-800" />
              ) : (
                <item.Icon />
              )}
            </div>

            <p>{item.title}</p>
            {item.id < steps.length && (
              <div className="border-richblack-600 absolute top-1/4 h-1 w-1/3 translate-x-20 transform border-t-2 border-dashed"></div>
            )}
          </div>
        ))}
      </div>

      {step === 1 && <CourseInformation />}
      {step === 2 && <CourseBuilder />}
      {step === 3 && <PublishCourse />}
    </div>
  );
}

{
  /* <div className="relative inline-flex flex-col items-center justify-start gap-2 self-stretch">
        <div className="absolute top-[19px] left-[345px] h-0 w-[217px] outline outline-1 outline-offset-[-0.50px] outline-[#424854]"></div>
        <div className="absolute top-[19px] left-[120px] h-0 w-[200px] outline outline-1 outline-offset-[-0.50px] outline-[#424854]"></div>
        <div
          data-style="Running"
          className="flex h-[38px] w-[38px] flex-col items-center justify-center gap-2.5 p-0.5"
        >
          <div className="relative flex-1 self-stretch rounded-[200px] bg-[#251400] outline outline-1 outline-offset-[-1px] outline-[#ffd60a]">
            <div className="absolute top-[7px] left-[7px] h-5 w-5 justify-center text-center font-['Inter'] text-lg leading-relaxed font-semibold text-[#ffd60a]">
              1
            </div>
          </div>
        </div>
        <div className="justify-start font-['Inter'] text-sm leading-snug font-normal text-[#f1f2ff]">
          Course Information
        </div>
      </div> */
}
