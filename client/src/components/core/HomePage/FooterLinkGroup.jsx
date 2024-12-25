import footerLinks from "../../../data/footerLinks";
import { Link } from "react-router-dom";
export default function FooterLinkGroup({ title }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-semibold text-richblack-50">{title}</span>
      {footerLinks
        .find((element) => element.title === `${title}`)
        ?.links.map((link, index) => (
          <div
            className="cursor-pointer text-sm text-richblack-400 transition-all duration-100 hover:text-richblack-50"
            key={index}
          >
            <Link to={link.link}>{link.title}</Link>
          </div>
        ))}
    </div>
  );
}
