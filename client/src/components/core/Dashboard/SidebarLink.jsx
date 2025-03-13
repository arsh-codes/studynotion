import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function SidebarLink({ linkDetails }) {
  const { id, name, path, Icon = RiUserLine } = linkDetails;
  return (
    <div>
      {name === "Settings" && (
        <div className="flex items-center justify-start self-stretch px-4 py-1">
          <div className="border-richblack-600 w-full border-t"></div>
        </div>
      )}
      <NavLink
        to={path}
        className={`text-richblack-300 ${path === location.pathname && "bg-yellow-800"} flex items-center gap-3 px-6 py-2`}
      >
        {/* icon */}
        <div className={`${path === location.pathname && "text-yellow-50"}`}>
          {<Icon />}
        </div>
        {/* text */}
        <div className={`${path === location.pathname && "text-yellow-50"}`}>
          {name}
        </div>
      </NavLink>
    </div>
  );
}
