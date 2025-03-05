import PropTypes from "prop-types";

const HighlightText = ({ text }) => {
  return (
    <span className="bg-gradient-to-b from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb] bg-clip-text text-transparent">
      {""} {/* Adds a space */}
      {text||"No text provided"}
    </span>
  );
};

// Define prop types
HighlightText.propTypes = {
  text: PropTypes.string,
  spaceBefore: PropTypes.bool,
};



export default HighlightText;
