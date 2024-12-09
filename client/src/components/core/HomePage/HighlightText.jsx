import React from "react";
import PropTypes from "prop-types";

const HighlightText = ({ text }) => {
  return (
    <span className="bg-gradient-to-b from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb] bg-clip-text text-transparent">
      &nbsp;{text || "No text provided"}
      {/* Optional fallback text if no text is passed */}
    </span>
  );
};

export default HighlightText;
