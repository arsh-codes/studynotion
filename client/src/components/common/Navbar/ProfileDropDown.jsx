import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { logout } from "@services/operations/authAPI";

const ProfileDropDown = () => {
  const navigate = useNavigate(); // useNavigate should be called at the top
  const { user } = useSelector((state) => state.profile);
  const profileDropDownLinks = [
    { title: "My Dashboard", path: "/dashboard/my-profile" },
    { title: "My Orders", path: "/user/orders" },
    { title: "Logout" },
  ];

  function handleLogout() {
    dispatch(logout(navigate));
  }
  const dispatch = useDispatch();
  return (
    <div className="group flex cursor-pointer items-center justify-center p-1">
      <img
        src={user?.image}
        className="h-7 w-7 rounded-full object-cover"
        alt={`${user?.name || "User"}'s Profile Picture`}
      />
      <div className="invisible absolute top-8 z-100 w-44 cursor-pointer divide-y divide-gray-100 rounded-lg bg-white opacity-0 shadow-sm transition-opacity duration-400 group-hover:visible group-hover:opacity-100 group-focus:opacity-100 dark:bg-gray-700">
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          {profileDropDownLinks.length === 0 ? (
            <li>Error getting data</li>
          ) : (
            profileDropDownLinks.map((profileDropDownLink, index) =>
              profileDropDownLink.title === "Logout" ? (
                <li
                  key={index}
                  onClick={handleLogout}
                  className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {profileDropDownLink.title}
                </li>
              ) : (
                <li key={index}>
                  <Link
                    to={profileDropDownLink.path}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
