import logo from "../../../assets/logo/logoFullLight.png";
import { Link, useLocation } from "react-router-dom";
import { MdMenuOpen, MdMenu } from "react-icons/md";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  RiShoppingCart2Line,
  RiShoppingCart2Fill,
  RiArrowDropDownLine,
} from "react-icons/ri";
import ProfileDropDown from "./ProfileDropDown";
import { apiConnector } from "../../../services/apiConnector";
import { categories } from "../../../services/apis";
export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token, user } = useSelector((state) => state.auth || {});
  const { totalItems } = useSelector((state) => state.cart || {});
  const [catalogLinks, setCatalogLinks] = useState([]);

  // Function to fetch catalog links from the API
  const fetchCatalogLinks = async () => {
    try {
      const response = await apiConnector(
        "GET",
        categories.SHOW_ALL_CATEGORIES_API,
      ); // Making GET request

      const data = response?.data?.data || [];
      setCatalogLinks(data);
    } catch (error) {
      console.error("Error fetching catalog links:", error);
    }
  };

  // Fetch catalog links when the component mounts
  useEffect(() => {
    fetchCatalogLinks();
  }, []); // Empty dependency array ensures it runs once

  const navbarLinks = [
    { title: "Home", path: "/" },
    { title: "Catalog" }, // No path to avoid navigation
    { title: "About Us", path: "/about" },
    { title: "Contact Us", path: "/contact" },
  ];

  return (
    <section className="border-richblack-700 bg-richblack-900 border-b border-solid select-none">
      <div className="text-richblack-25 flex w-full items-center justify-between px-4 py-8 md:mx-auto md:w-11/12 md:justify-evenly md:gap-1 md:px-28 md:py-3">
        {/* Logo */}
        <Link to="/">
          <img className="h-6" src={logo} alt="Logo" />
        </Link>
        {/* Hamburger for mobile devices */}
        <div
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="block text-2xl md:hidden"
        >
          {isMenuOpen ? <MdMenuOpen /> : <MdMenu />}
        </div>

        {/* Links list for bigger screens */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-3 px-3 py-1 select-none">
            {navbarLinks.map((navLink, index) => (
              <li
                key={index}
                className={`relative ${
                  navLink.path === location.pathname
                    ? "text-yellow-50"
                    : "text-richblack-25"
                }`}
              >
                {/* catalog is a dropdown */}
                {navLink.title === "Catalog" ? (
                  <div className="group relative flex items-center">
                    {navLink.title}
                    <RiArrowDropDownLine className="h-6 w-6 transition-all duration-200 group-hover:rotate-180" />

                    <div className="invisible absolute top-8 z-100 w-44 cursor-pointer divide-y divide-gray-100 rounded-lg bg-white opacity-0 shadow-sm transition-opacity duration-400 group-hover:visible group-hover:opacity-100 group-focus:opacity-100 dark:bg-gray-700">
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        {catalogLinks.length === 0 ? (
                          <li>No categories found</li>
                        ) : (
                          catalogLinks.map((category, index) => (
                            <Link to={category.path} key={index}>
                              <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                {category.categoryName}
                              </li>
                            </Link>
                          ))
                        )}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link to={navLink.path}>{navLink.title}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Signup and Login if not logged in */}
        {token == null ? (
          <div className="hidden items-center gap-3 md:flex">
            <Link to="/signup">
              <div className="border-richblack-700 bg-richblack-800 w-fit rounded-lg border px-3 py-2">
                <div className="text-richblack-100 text-center font-medium">
                  Sign up
                </div>
              </div>
            </Link>
            <Link to="/login">
              <div className="border-richblack-700 bg-richblack-800 w-fit rounded-lg border px-3 py-2">
                <div className="text-richblack-100 text-center font-medium">
                  Log In
                </div>
              </div>
            </Link>
          </div>
        ) : null}
        {/* Cart Icon shown if logged in  */}
        {token != null ? (
          // Count circle and filled cart icon shown if items in cart
          totalItems > 0 ? (
            <div className="relative flex items-center justify-center">
              <div className="absolute top-0 left-4">
                <p className="text-richblack-25 bg-richblack-900 flex h-1 w-1 items-center justify-center rounded-full p-2 text-xs">
                  {totalItems || 0}{" "}
                </p>
              </div>
              <Link to="/cart">
                <RiShoppingCart2Fill className="h-9 w-6" />
              </Link>
            </div>
          ) : (
            // empty cart icon if no items in cart
            <Link to="/cart">
              <RiShoppingCart2Line className="h-9 w-6" />
            </Link>
          )
        ) : null}
        {/* Profile dropdown shown if logged in  */}
        {token != null ? (
          <div>
            <ProfileDropDown />
          </div>
        ) : null}
      </div>
    </section>
  );
}
