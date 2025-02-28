import React from "react";
import logoSmallLight from "../../../assets/logo/logoSmallLight.png";
import { Link } from "react-router-dom";
const ProfileDropDown = () => {
  const profileDropDownLinks = [
    { title: "My Profile", path: "/user/profile" },
    { title: "My Orders", path: "/user/orders" },
    { title: "Logout", path: "/logout" },
  ];

  return (
    <div className="group flex cursor-pointer items-center justify-center p-1">
      <img src={logoSmallLight} className="h-7 rounded-full" />
      <div className="invisible absolute top-8 z-100 w-44 cursor-pointer divide-y divide-gray-100 rounded-lg bg-white opacity-0 shadow-sm transition-opacity duration-400 group-hover:visible group-hover:opacity-100 group-focus:opacity-100 dark:bg-gray-700">
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          {profileDropDownLinks.length == 0 ? (
            <li>No categories found</li>
          ) : (
            profileDropDownLinks.map((profileDropDownLink, index) => (
              <Link to={profileDropDownLink.path}>
                <li
                  key={index}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {profileDropDownLink.title}
                </li>
              </Link>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProfileDropDown;
