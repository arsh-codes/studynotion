import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "@services/operations/authAPI";

const ProfileDropDown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const [isDropDownActive, setIsDropDownActive] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  const profileDropDownLinks = [
    { title: "My Dashboard", path: "/dashboard/my-profile" },
    { title: "My Orders", path: "/user/orders" },
    { title: "Logout" },
  ];

  function handleLogout() {
    dispatch(logout(navigate));
  }

  // Effect to handle clicks outside the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropDownActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="group text-richblack-5 relative flex cursor-pointer items-center justify-center p-1"
      onMouseEnter={() => setIsDropDownActive(true)}
      onMouseLeave={() => setIsDropDownActive(false)}
    >
      <img
        src={user?.image}
        className="border-richblack-600 h-8 w-8 rounded-full border-2 object-cover"
        alt={`${user?.name || "User  "}'s Profile Picture`}
        onClick={() => setIsDropDownActive((prev) => !prev)}
      />
      <div
        ref={dropdownRef} // Attach the ref to the dropdown
        className={`bg-richblack-800 border-richblack-700 absolute top-10 right-1 z-50 cursor-pointer rounded-md border text-sm shadow-lg transition-opacity duration-300 md:-right-12 ${isDropDownActive ? "visible opacity-100" : "invisible opacity-0"}`}
        aria-hidden={!isDropDownActive}
      >
        <ul className="relative flex flex-col gap-1 p-2">
          {profileDropDownLinks.length === 0 ? (
            <li className="px-4 py-2 text-red-500">Error getting data</li>
          ) : (
            profileDropDownLinks.map((profileDropDownLink, index) =>
              profileDropDownLink.title === "Logout" ? (
                <li
                  key={index}
                  onClick={handleLogout}
                  className="hover:bg-richblack-700 flex cursor-pointer items-center rounded px-4 py-2 md:whitespace-nowrap"
                >
                  {profileDropDownLink.title}
                </li>
              ) : (
                <li key={index}>
                  <Link
                    to={profileDropDownLink.path}
                    className="hover:bg-richblack-700 no-wrap flex cursor-pointer items-center rounded px-4 py-2 md:whitespace-nowrap"
                  >
                    {profileDropDownLink.title}
                  </Link>
                </li>
              ),
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProfileDropDown;
