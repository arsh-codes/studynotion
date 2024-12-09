import React from "react";
import { Link } from "react-router-dom";

const CTAButton = ({ primaryButton, children, linkTo }) => {
  return (
    <Link to={linkTo}>
      <div
        className={`flex items-center rounded-lg text-center text-base font-medium shadow-md ${
          primaryButton
            ? "bg-yellow-50 text-richblack-900"
            : "bg-richblack-800 text-richblack-5"
        } px-6 py-3`}
      >
        {children}
      </div>
    </Link>
  );
};

export default CTAButton;
