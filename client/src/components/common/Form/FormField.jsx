import PropTypes from "prop-types";
import React from "react";

/**
 * FormField - A reusable form field component.
 *
 * @param {string} labelName - The label text for the input field.
 * @param {boolean} requiredAsterisk - Whether to show an asterisk for required fields (default: true).
 * @param {string} inputType - The type of input (e.g., text, email, password).
 * @param {string} id - The ID for the input field (should be unique).
 * @param {object} rest - Additional props (e.g., onChange, value, etc.).
 */
export default function FormField({
  labelName,
  requiredAsterisk = true,
  inputType,
  onChange,
  id,
  ...rest // Accepts additional props
}) {
  return (
    <section className="flex w-full flex-col gap-1.5">
      {/* Label for the input field */}
      <label htmlFor={id} className="text-white">
        {labelName}
        {requiredAsterisk && <sup className="text-sm text-pink-200">*</sup>}
      </label>

      {/* Input field */}
      <input
        type={inputType}
        name={id}
        id={id}
        onChange={onChange}
        className="bg-richblack-700 overflow-hidden rounded-lg p-3 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]"
        {...rest} // Spreads additional props (e.g., value, onChange)
      />
    </section>
  );
}

// Prop Types Validation
FormField.propTypes = {
  labelName: PropTypes.string.isRequired,
  requiredAsterisk: PropTypes.bool,
  inputType: PropTypes.string,
  id: PropTypes.string.isRequired,
};
