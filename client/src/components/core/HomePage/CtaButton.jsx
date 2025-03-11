import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CtaButton = ({ primaryButton = false, text, children, linkTo }) => {
  return (
    <Link to={linkTo}>
      <div
        className={`flex w-fit cursor-pointer items-center rounded-lg px-6 py-3 text-center text-base font-medium shadow-md ${
          primaryButton
            ? "text-richblack-900 bg-yellow-50"
            : "bg-richblack-800 text-richblack-5"
        }`}
      >
        {text || children}
      </div>
    </Link>
  );
};

// Define prop types
CtaButton.propTypes = {
  primaryButton: PropTypes.bool,
  text: PropTypes.string, // Added prop type for text
  children: PropTypes.node, // Made children optional
  linkTo: PropTypes.string.isRequired,
};

export default CtaButton;
