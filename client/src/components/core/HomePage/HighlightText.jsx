import PropTypes from "prop-types";

const gradientStyles = {
  orange: "linear-gradient(118deg, #f67a22 -50%, #ff954a 90.11%)",
  yellow:
    "linear-gradient(90deg, rgba(239,150,17,1) 0%, rgba(244,186,27,1) 100%)",
  blue: "linear-gradient(118deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%)",
  blue2:
    "linear-gradient(118deg, #5433FF -4%, #20BDFF 51.26%, #A5FECB 106.52%)",
  red: "linear-gradient(118deg, #933fcb -2.4%, #FD1D1D 52.25%, #fc7245 106.89%)",
};

const HighlightText = ({ text, gradient = "blue" }) => {
  return (
    <span
      className="bg-clip-text text-transparent"
      style={{
        backgroundImage: gradientStyles[gradient],
      }}
    >
      {" "}
      {text || "No text provided"}{" "}
    </span>
  );
};

HighlightText.propTypes = {
  text: PropTypes.string.isRequired,
  gradient: PropTypes.oneOf(["orange", "yellow", "blue", "blue2", "red"]),
};

export default HighlightText;
