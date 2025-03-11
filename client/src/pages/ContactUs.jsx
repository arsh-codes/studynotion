import ContactForm from "../components/core/AboutPage/ContactForm";
import { FaMapLocationDot } from "react-icons/fa6";
import Footer from "../components/common/Footer";
import { IoMdChatbubbles } from "react-icons/io";
import { MdCall } from "react-icons/md";
import React from "react";

export default function ContactUs() {
  // Contact details array containing heading, description, and icons
  const contactUsDetails = [
    {
      heading: "Chat with Us",
      text1: "Our support team is available 24/7.",
      text2: "support@studynotion.com",
      icon: <IoMdChatbubbles className="mt-1 h-6 w-6" />,
    },
    {
      heading: "Visit Our Office",
      text1: "Drop by for a coffee and a chat.",
      text2: "Prestige Tech Park, Marathahalli, Bangalore",
      icon: <FaMapLocationDot className="mt-1 h-6 w-6" />,
    },
    {
      heading: "Call Us",
      text1: "Available Monday - Friday, 9 AM to 6 PM",
      text2: "+91-9876543210",
      icon: <MdCall className="mt-1 h-6 w-6" />,
    },
  ];

  return (
    <section className="bg-richblack-900 flex h-full w-full flex-1 flex-col items-center gap-1">
      {/* Main Container */}
      <div className="mx-auto flex w-11/12 flex-col items-start justify-center gap-12 py-20 md:flex-row">
        {/* Contact Details Section */}
        <div className="bg-richblack-800 flex max-w-xl flex-col items-center justify-center gap-5 rounded-md p-6">
          {contactUsDetails.map((element, index) => (
            <section key={index} className="flex w-full flex-row gap-3 p-3">
              {/* Icon */}
              <div className="text-richblack-5">{element.icon}</div>

              {/* Contact Info */}
              <div className="flex flex-col">
                <p className="text-richblack-5 font-semibold">
                  {element.heading}
                </p>
                <p className="text-richblack-200">{element.text1}</p>
                <p className="text-richblack-200">{element.text2}</p>
              </div>
            </section>
          ))}
        </div>

        {/* Contact Form Section */}
        <div className="border-richblack-600 flex flex-col gap-3 rounded-md border p-8 md:p-20">
          {/* Form Heading */}
          <p className="text-richblack-5 text-4xl font-semibold">
            Got an Idea? We’ve got the skills.
            <br /> Let’s team up.
          </p>

          {/* Form Subtext */}
          <p className="text-richblack-300 font-medium">
            Tell us more about yourself and what you have in mind.
          </p>

          {/* Contact Form Component */}
          <ContactForm />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </section>
  );
}
