import React from "react";

const HighlightText = (props) => {
  return (
    <span className="h-[90px] w-[130px] bg-gradient-to-b from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb] bg-clip-text text-transparent">
      &nbsp;{props.text}
    </span>
  );
};

export default HighlightText;
