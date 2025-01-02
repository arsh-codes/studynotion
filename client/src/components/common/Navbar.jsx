import logo from "../../assets/logo/logoFullLight.png";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation(); // Get the current location object

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

  return (
    <section className="border-b border-solid border-richblack-700 bg-richblack-900">
      <div className="mx-auto flex h-fit w-11/12 justify-evenly gap-1 px-28 py-3">
        <Link to="/">
          <img className="h-8" src={logo} alt="Logo" />
        </Link>
        {/* Links list */}
        <nav>
          <ul className="flex items-center justify-center gap-3 px-3 py-1 select-none">
            {navbarLinks.map((link, index) => (
              <li
                key={index}
                className={`text-center text-base font-normal ${
                  link.path === location.pathname ? "text-yellow-50" : "text-richblack-25"
                }`}
              >
                {link.path ? <Link to={link.path}>{link.title}</Link> : link.title}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
