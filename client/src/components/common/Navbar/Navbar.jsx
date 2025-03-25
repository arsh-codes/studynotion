import { Link, useLocation } from "react-router-dom";
import {
  RiArrowDropDownLine,
  RiShoppingCart2Fill,
  RiShoppingCart2Line,
} from "react-icons/ri";
import { useEffect, useRef, useState } from "react";

import Menu from "./Menu";
import ProfileDropDown from "@components/common/Navbar/ProfileDropDown";
import { getAllCategories } from "@client/services/operations/courseDetailsAPI"; // Import the function to fetch categories
import logo from "@assets/logo/logoFullLight.png";
import { useSelector } from "react-redux";

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const { totalItems } = useSelector((state) => state.cart || {});
  const [catalogLinks, setCatalogLinks] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Create a ref for the catalog dropdown to manage its visibility
  const catalogRef = useRef(null);

  // Fetch catalog links when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getAllCategories(); // Fetch categories
      setCatalogLinks(categories); // Set the fetched categories
    };

    fetchCategories(); // Call the function to fetch categories
  }, []); // Empty dependency array ensures it runs once

  // Close catalog dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the catalog dropdown
      if (catalogRef.current && !catalogRef.current.contains(event.target)) {
        setIsCatalogOpen(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Add event listener for clicks
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup listener on unmount
    };
  }, [catalogRef]); // Dependency on catalogRef

  const navbarLinks = [
    { title: "Home", path: "/" },
    { title: "Catalog" }, // No path to avoid navigation
    { title: "About Us", path: "/about" },
    { title: "Contact Us", path: "/contact" },
  ];

  return (
    <section className="border-richblack-700 bg-richblack-800 z-10 border-b border-solid select-none">
      <div className="text-richblack-25 flex w-full flex-row items-center justify-between p-4 md:mx-auto md:w-11/12">
        {/* Logo */}
        <Link to="/">
          <img className="h-7 pl-10 md:p-0" src={logo} alt="Logo" />
        </Link>

        {/* Hamburger menu for smaller screens */}
        <Menu
          isMenuOpen={isMenuOpen}
          isCatalogOpen={isCatalogOpen}
          setIsMenuOpen={setIsMenuOpen}
          setIsCatalogOpen={setIsCatalogOpen}
          navbarLinks={navbarLinks}
          catalogLinks={catalogLinks}
        />

        {/* Links list for bigger screens */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-3 px-3 py-1 select-none">
            {navbarLinks.map((navLink, index) => (
              <li
                key={index}
                className={`relative ${
                  navLink.path === location.pathname
                    ? "text-yellow-50" // Highlight active link
                    : "text-richblack-25"
                }`}
              >
                {/* Catalog is a dropdown */}
                {navLink.title === "Catalog" ? (
                  <div
                    className="group relative flex cursor-pointer items-center"
                    onClick={() => setIsCatalogOpen((prev) => !prev)} // Toggle catalog dropdown on click
                    ref={catalogRef} // Attach the ref here for outside click detection
                  >
                    {navLink.title}
                    <RiArrowDropDownLine
                      className={`h-6 w-6 transition-all duration-200 ${isCatalogOpen && "rotate-180"}`} // Rotate icon based on dropdown state
                    />

                    <div
                      className={`bg-richblack-800 border-richblack-700 absolute top-10 -right-10 z-50 w-fit cursor-pointer rounded-md border p-2 text-sm shadow-sm transition-opacity duration-300 ${isCatalogOpen ? "visible opacity-100" : "invisible opacity-0"}`} // Control visibility and opacity of dropdown
                    >
                      <ul className="text-richblack-5 text-sm">
                        {catalogLinks.length === 0 ? (
                          <li className="hover:bg-richblack-700 flex cursor-pointer items-center rounded px-4 py-2 md:whitespace-nowrap">
                            No categories found
                          </li>
                        ) : (
                          catalogLinks.map((category, index) => (
                            <Link to={category.path} key={index}>
                              <li className="hover:bg-richblack-700 flex cursor-pointer items-center rounded px-4 py-2 md:whitespace-nowrap">
                                {category.categoryName}
                              </li>
                            </Link>
                          ))
                        )}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link to={navLink.path}>{navLink.title}</Link> // Regular link for other navbar items
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Signup and Login if not logged in */}
        {!isLoggedIn && (
          <div className="hidden items-center gap-3 md:flex">
            <Link to="/signup">
              <div className="border-richblack-700 bg-richblack-800 w-fit rounded-lg border px-3 py-2 active:scale-[97%]">
                <div className="text-richblack-100 text-center font-medium">
                  Sign up
                </div>
              </div>
            </Link>
            <Link to="/login">
              <div className="border-richblack-700 bg-richblack-800 w-fit rounded-lg border px-3 py-2 active:scale-[97%]">
                <div className="text-richblack-100 text-center font-medium">
                  Log In
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Cart Icon shown if logged in  */}
        <div className="flex flex-row gap-3">
          {isLoggedIn &&
            (totalItems > 0 ? (
              <div className="relative hidden items-center justify-center md:flex">
                <div className="absolute top-0 left-4">
                  <p className="text-richblack-25 bg-richblack-900 flex h-1 w-1 items-center justify-center rounded-full p-2 text-xs">
                    {totalItems || 0}{" "}
                  </p>
                </div>
                <Link to="/dashboard/cart">
                  <RiShoppingCart2Fill className="h-9 w-6" />
                </Link>
              </div>
            ) : (
              <Link to="/dashboard/cart" className="hidden md:flex">
                <RiShoppingCart2Line className="h-9 w-6" />
              </Link>
            ))}
          {/* Profile dropdown shown if logged in  */}
          {isLoggedIn && <ProfileDropDown />}
        </div>
      </div>
    </section>
  );
}
