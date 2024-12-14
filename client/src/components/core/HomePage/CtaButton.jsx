import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CtaButton = ({ primaryButton, children, linkTo }) => {
  return (
    <Link to={linkTo}>
      <div
        className={`flex w-fit cursor-pointer items-center rounded-lg text-center text-base font-medium shadow-md ${
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

// Define prop types
CtaButton.propTypes = {
  primaryButton: PropTypes.bool,
  children: PropTypes.node.isRequired,
  linkTo: PropTypes.string.isRequired,
};

// Define default props
CtaButton.defaultProps = {
  primaryButton: false,
};

export default CtaButton;
