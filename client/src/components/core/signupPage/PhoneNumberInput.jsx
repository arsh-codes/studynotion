import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from "react";

export default function PhoneNumberInput() {
  const countries = [
    "India (+91)",
    "France (+33)",
    "Germany (+49)",
    "Spain (+34)",
    "USA (+1)",
  ];
  const countryCode = ["+91", "+33", "+49", "+34", "+1"];

  const [country, setCountry] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="relative flex flex-col gap-1.5">
      <label htmlFor="phoneNumberSignup">
        Phone Number{" "}
        <span className="text-sm leading-snug text-pink-200">*</span>
      </label>
      {/* dropdown and input field */}
      <div className="flex flex-row items-center gap-2">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="bg-richblack-700 overflow-hidden rounded-lg p-3 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)] flex flex-row gap-1 items-center justify-center"
        >
          {countryCode[country]}
          <RiArrowDropDownLine className="h-6 w-6 transition-all duration-200 group-hover:rotate-180" />
        </button>
        {menuOpen ? (
          <ul className="bg-richblack-800 absolute left-0 z-10 mt-1 max-h-60 w-40 overflow-auto rounded border border-gray-600 shadow-lg">
            {countries.map((country, index) => (
              <li
                key={country}
                onClick={() => {
                  setCountry(index);
                  setMenuOpen(false);
                }}
                className="cursor-pointer px-3 py-2 text-white hover:bg-gray-700"
              >
                {country}
              </li>
            ))}
          </ul>
        ) : null}

        <input
          name="phoneNumberSignup"
          id="phoneNumberSignup"
          className="bg-richblack-700 overflow-hidden rounded-lg p-3 shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255,0.18)]"
          placeholder="Enter phone number"
          required
        />
      </div>
    </div>
  );
}
