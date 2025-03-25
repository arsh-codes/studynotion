import { MdMenu, MdMenuOpen } from "react-icons/md";
import { useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function Menu({
  isMenuOpen,
  isCatalogOpen,
  setIsMenuOpen,
  setIsCatalogOpen,
  navbarLinks,
  catalogLinks,
}) {
  // `useRef` is used to reference DOM elements (menu and catalog dropdown)
  const menuRef = useRef(null); // Reference for the main menu container
  const catalogRef = useRef(null); // Reference for the catalog dropdown container

  // Effect to handle clicks outside the menu and catalog dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      // If the menu is open and the click is outside both the menu and catalog dropdown, close both
      if (
        menuRef.current && // Check if menu exists
        !menuRef.current.contains(event.target) && // Click is outside menu
        (!catalogRef.current || !catalogRef.current.contains(event.target)) // Click is also outside catalog dropdown
      ) {
        setIsMenuOpen(false);
        setIsCatalogOpen(false);
      }
    }

    // Add event listener only when the menu is open
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside); // Listen for outside clicks
    }
    // Cleanup function: Remove event listener when the component unmounts or menu closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]); // Run this effect only when `isMenuOpen` changes

  return (
    <>
      {/* Hamburger icon for mobile menu */}
      <button
        onClick={() => {
          setIsMenuOpen((prev) => !prev);
          setIsCatalogOpen(false);
        }}
        className="absolute left-3 block cursor-pointer text-2xl md:hidden"
        aria-expanded={isMenuOpen}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <MdMenuOpen /> : <MdMenu />}
      </button>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div
          ref={menuRef} // Assign menuRef to this div
          className="bg-richblack-800 border-richblack-700 absolute top-18 left-1 w-fit rounded-md border text-sm"
        >
          <ul className="relative flex flex-col gap-1 p-2">
            {navbarLinks.map((navLink, index) => (
              <li key={index} className="relative">
                {navLink.title === "Catalog" ? (
                  <div
                    className={`hover:bg-richblack-700 flex cursor-pointer items-center rounded px-4 py-2 pr-4 pl-2 transition-colors duration-200 hover:bg-gray-100${
                      isCatalogOpen ? "bg-richblack-700" : ""
                    }`}
                    onClick={() => setIsCatalogOpen((prev) => !prev)}
                    aria-expanded={isCatalogOpen}
                    aria-label="Toggle catalog"
                  >
                    {navLink.title}
                    <RiArrowDropDownLine
                      className={`h-5 transition-transform duration-200 ${
                        isCatalogOpen ? "rotate-90" : "rotate-270"
                      }`}
                    />
                  </div>
                ) : (
                  <Link
                    to={navLink.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:bg-richblack-700 flex cursor-pointer items-center rounded px-4 py-2 pr-4 pl-2"
                  >
                    {navLink.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Catalog Dropdown (Appears next to Mobile Menu) */}
      {isMenuOpen && isCatalogOpen && (
        <div
          ref={catalogRef} // Assign catalogRef to this div
          className="bg-richblack-800 border-richblack-700 absolute top-32 left-29 w-fit rounded-md border text-sm shadow-md"
        >
          <ul className="py-2">
            {catalogLinks.length === 0 ? (
              <li className="px-4 py-2">No categories found</li>
            ) : (
              catalogLinks.map((category, idx) => (
                <Link
                  to={category.path}
                  key={idx}
                  onClick={() => setIsCatalogOpen(false)}
                >
                  <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                    {category.categoryName}
                  </li>
                </Link>
              ))
            )}
          </ul>
        </div>
      )}
    </>
  );
}
