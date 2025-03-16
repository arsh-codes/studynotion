import { countries, countryCodes } from "@data/countryCodes";

import { RiArrowDropDownLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function PhoneNumberInput({ onChange, id, ...rest }) {
  // Fetch signup data from Redux store
  const signupData = useSelector((state) => state.auth.signupData);

  // State to manage selected country and dropdown visibility
  const [country, setCountry] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative flex flex-col gap-1.5 text-richblack-5">
      {/* Label for input */}
      <label htmlFor={id}>
        Phone Number{" "}
        <span className="text-sm leading-snug text-pink-200">*</span>
      </label>

      {/* Dropdown and Input field container */}
      <div className="flex flex-row items-center gap-2">
        {/* Country Code Dropdown Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="bg-richblack-700 flex flex-row items-center justify-center gap-1 rounded-lg p-3 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]"
        >
          {countryCodes[country]}
          <RiArrowDropDownLine
            className={`h-6 w-6 transition-transform duration-200 ${menuOpen ? "rotate-180" : "rotate-0"}`}
          />
        </button>

        {/* Country Dropdown Menu */}
        {menuOpen && (
          <ul className="bg-richblack-800 absolute left-0 z-10 mt-1 max-h-60 w-40 overflow-auto rounded border border-gray-600 shadow-lg">
            {countries.map((country, index) => (
              <li
                key={country}
                onClick={() => {
                  setCountry(index);
                  setMenuOpen(false);
                }}
                className="cursor-pointer px-3 py-2 text-richblack-5 hover:bg-gray-700"
              >
                {country}
              </li>
            ))}
          </ul>
        )}

        {/* Phone Number Input Field */}
        <input
          type="tel"
          name={id}
          id={id}
          className="bg-richblack-700 rounded-lg p-3 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]"
          placeholder="Enter phone number"
          required
          value={signupData.phoneNumber || ""} // Corrected value binding
          onChange={onChange} // Fixed missing event handler
          {...rest} // Spread remaining props (e.g., `className`, `disabled`)
        />
      </div>
    </div>
  );
}
