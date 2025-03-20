import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SidebarLink({ linkDetails }) {
  const { title, path, Icon, accountType } = linkDetails;
  const { user } = useSelector((state) => state.profile);
  const location = useLocation(); // ✅ Get the current path properly
  const isActive = location.pathname === path; // ✅ Store active condition

  if (accountType && accountType !== user?.accountType) return null; // ✅ Check user account type

  return (
    <div>
      {/* Divider above Settings */}
      {title === "Settings" && (
        <div className="flex items-center justify-start self-stretch px-4 py-1">
          <div className="border-richblack-600 w-full border-t"></div>
        </div>
      )}

      <NavLink
        to={path}
        className={`text-richblack-300 relative flex h-fit items-center gap-3 px-6 py-2 ${
          isActive ? "bg-yellow-800 text-yellow-50" : ""
        }`}
      >
        {/* Left border indicator */}
        {isActive && (
          <div className="absolute top-0 left-0 h-full self-stretch border border-yellow-50"></div>
        )}

        {/* Icon */}
        <div>
          <Icon className={`text-lg ${isActive ? "text-yellow-50" : ""}`} />
        </div>

        {/* Title */}
        <div>{title}</div>
      </NavLink>
    </div>
  );
}
