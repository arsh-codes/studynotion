import React from "react";

const HighlightText = (props) => {
  return (
    <span className="gradient-to-r from-black to-white font-bold">
      &nbsp;{props.text}
    </span>
  );
};

export default HighlightText;
