import PropTypes from "prop-types";

const HighlightText = ({ text, spaceBefore }) => {
  return (
    <span className="bg-gradient-to-b from-[#1fa2ff] via-[#12d8fa] to-[#a6ffcb] bg-clip-text text-transparent">
      {spaceBefore ? "\u00A0" : ""} {/* Adds a space if spaceBefore is true */}
      {text}
    </span>
  );
};

// Define prop types
HighlightText.propTypes = {
  text: PropTypes.string,
  spaceBefore: PropTypes.bool,
};

// Define default props
HighlightText.defaultProps = {
  spaceBefore: true, // Default: Adds a space before the text
  text: "No text provided",
};

export default HighlightText;
