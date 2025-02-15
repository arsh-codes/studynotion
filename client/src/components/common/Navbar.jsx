import logo from "../../assets/logo/logoFullLight.png";
import { Link, useLocation } from "react-router-dom";
import { MdMenuOpen, MdMenu } from "react-icons/md";
import { useState } from "react"; // Import useState

export default function Navbar() {
  const location = useLocation(); // Get the current location object
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu open/close

  const navbarLinks = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Catalog",
      // path: '/catalog',
    },
    {
      title: "About Us",
      path: "/about",
    },
    {
      title: "Contact Us",
      path: "/contact",
    },
  ];

  // Toggle the menu state
  const menuClickHandler = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <section className="border-richblack-700 bg-richblack-900 border-b border-solid select-none">
      <div className="flex w-full items-center justify-between px-4 py-8 md:mx-auto md:w-11/12 md:justify-evenly md:gap-1 md:px-28 md:py-3">
        <Link to="/">
          <img className="h-8" src={logo} alt="Logo" />
        </Link>
        {/* Hamburger for mobile devices */}
        <div
          onClick={menuClickHandler}
          className="text-richblack-25 block text-2xl md:hidden"
        >
          {isMenuOpen ? <MdMenuOpen /> : <MdMenu />}
        </div>
        {/* Links list */}
        <nav className="hidden md:block">
          <ul className="flex items-center justify-center gap-3 px-3 py-1 select-none">
            {navbarLinks.map((link, index) => (
              <li
                key={index}
                className={`text-center text-base font-normal ${
                  link.path === location.pathname
                    ? "text-yellow-50"
                    : "text-richblack-25"
                }`}
              >
                {link.path ? (
                  <Link to={link.path}>{link.title}</Link>
                ) : (
                  link.title
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
