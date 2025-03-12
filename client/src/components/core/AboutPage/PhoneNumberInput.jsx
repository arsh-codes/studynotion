import { countries, countryCodes } from "@data/countryCodes";
import { useEffect, useRef, useState } from "react";

import { RiArrowDropDownLine } from "react-icons/ri";

export default function PhoneNumberInput({ register, errors, setValue }) {
  const [countryIndex, setCountryIndex] = useState(75); // Default country index
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setValue("countryCode", countryCodes[countryIndex]);
  }, [countryIndex, setValue]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex flex-col">
      <label
        htmlFor="phoneNumber"
        className="text-richblack-5 pb-1.5 font-medium"
      >
        Phone Number
      </label>
      <div className="flex gap-2">
        {/* Country Code Dropdown */}
        <div ref={dropdownRef} className="relative">
          <div
            className="bg-richblack-700 text-richblack-5 flex cursor-pointer items-center justify-between gap-1 rounded-lg p-3 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {countryCodes[countryIndex]}
            <RiArrowDropDownLine
              className={`h-6 w-6 transition-transform duration-200 ${menuOpen ? "rotate-180" : "rotate-0"}`}
            />
          </div>
          {menuOpen && (
            <ul className="bg-richblack-800 absolute top-12 left-0 z-10 max-h-60 w-40 overflow-auto rounded border border-gray-600 shadow-lg">
              {countries.map((country, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setCountryIndex(index);
                    setValue("countryCode", countryCodes[index]);
                    setMenuOpen(false);
                  }}
                  className="text-richblack-5 cursor-pointer px-3 py-2 hover:bg-gray-700"
                >
                  {country}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Phone Number Input */}
        <input
          id="phoneNumber"
          type="tel"
          {...register("phoneNumber", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9\s-()]{7,15}$/,
              message: "Invalid phone number",
            },
          })}
          placeholder="Enter Phone Number"
          className="bg-richblack-700 text-richblack-200 flex-1 rounded-lg p-3 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]"
        />
      </div>
      {errors.phoneNumber && (
        <span className="mt-1 text-sm text-red-500">
          {errors.phoneNumber.message}
        </span>
      )}
    </div>
  );
}
