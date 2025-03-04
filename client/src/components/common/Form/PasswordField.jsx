import { BsEye, BsEyeSlash } from "react-icons/bs";
import React, { useState } from "react";

import PropTypes from "prop-types";

export default function PasswordField({
  labelName,
  requiredAsterisk = true,
  id,
  ...rest // Accepts additional props
}) {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  function togglePasswordVisibility() {
    setPasswordVisibility(!passwordVisibility);
  }

  return (
    <section className="relative flex flex-col gap-1.5">
      <label htmlFor={id} className="text-white">
        {labelName}{" "}
        {requiredAsterisk && <span className="text-sm text-pink-200">*</span>}
      </label>
      <input
        type={passwordVisibility ? "text" : "password"}
        id={id}
        name={id}
        className="bg-richblack-700 overflow-hidden rounded-lg p-3 pr-16 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]"
        {...rest} // Spreads additional props (e.g., value, onChange)
      />
      {passwordVisibility ? (
        <BsEye
          onClick={togglePasswordVisibility}
          className="text-richblack-5 absolute top-[2.875rem] right-5 h-4.5 w-4.5 cursor-pointer"
        />
      ) : (
        <BsEyeSlash
          onClick={togglePasswordVisibility}
          className="text-richblack-5 absolute top-[2.875rem] right-5 h-4.5 w-4.5 cursor-pointer"
        />
      )}
    </section>
  );
}

// Define PropTypes
PasswordField.propTypes = {
  labelName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
