import { NavLink } from "react-router";
import SidebarLink from "@components/core/Dashboard/SidebarLink";
import dashboardSidebarLinks from "@data/dashboardSidebarLinks";
import { logout } from "@services/operations/authAPI";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const dispatch = useDispatch();
  const { user, profileLoading } = useSelector((state) => state.profile);

  return (
    <section className="text-richblack-300 h-flex-1 w-fit border border-yellow-200 py-7">
      <ul>
        {dashboardSidebarLinks.map((link) => (
          <SidebarLink key={link.id} linkDetails={link} />
        ))}
      </ul>
    </section>
  );
}
