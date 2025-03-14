import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export default function SidebarLink({ linkDetails }) {
  const { id, title, path, Icon, accountType } = linkDetails;
  const userAccountType = "student";
  const { user } = useSelector((state) => state.profile);

  if (accountType && accountType !== user.accountType) return null;

  return (
    <div>
      {title === "Settings" && (
        <div className="flex items-center justify-start self-stretch px-4 py-1">
          <div className="border-richblack-600 w-full border-t"></div>
        </div>
      )}

      <NavLink
        to={path}
        className={`text-richblack-300 ${path === location.pathname && "bg-yellow-800"} relative flex h-fit items-center gap-3 px-6 py-2`}
      >
        {path === location.pathname && (
          <div className="absolute top-0 left-0 h-full self-stretch border border-yellow-50"></div>
        )}
        {/* icon */}
        <div className={`${path === location.pathname && "text-yellow-50"}`}>
          {<Icon />}
        </div>
        {/* text */}
        <div className={`${path === location.pathname && "text-yellow-50"}`}>
          {title}
        </div>
      </NavLink>
    </div>
  );
}
