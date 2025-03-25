import ConfirmationModal from "@client/components/common/ConfirmationModal";
import { FiLogOut } from "react-icons/fi";
import SidebarLink from "@components/core/Dashboard/SidebarLink";
import dashboardSidebarLinks from "@data/dashboardSidebarLinks";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Sidebar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  function handleLogoutButton() {
    setModalIsOpen(true);
  }
  return (
    <section className="text-richblack-300 bg-richblack-800 h-flex-1 min-w-fit py-7">
      <ConfirmationModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
      <ul>
        {dashboardSidebarLinks.map((link) => (
          <SidebarLink key={link.id} linkDetails={link} />
        ))}
        <li className="cursor-pointer">
          <button
            className={`text-richblack-300 flex h-fit cursor-pointer items-center gap-3 px-6 py-2`}
            onClick={handleLogoutButton}
          >
            <FiLogOut />
            Log Out
          </button>
        </li>
      </ul>
    </section>
  );
}
