import React from "react";
import { Link } from "react-router-dom";

const CTAButton = ({ primaryButton, children, linkTo }) => {
  return (
    <Link to={linkTo}>
      <div
        className={`flex shadow-md items-center gap-2 rounded-lg ${
          primaryButton
            ? "bg-[#ffd60a] text-[#000814]"
            : "bg-[#161d29] text-[#f1f2ff]"
        } px-6 py-3`}
      >
        {children}
      </div>
    </Link>
  );
};

export default CTAButton;
