import {
  RiHistoryFill,
  RiMoneyDollarCircleLine,
  RiUserLine,
} from "react-icons/ri";

import { CiBookmark } from "react-icons/ci";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { MdOutlineLibraryBooks } from "react-icons/md";

const dashboardSidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    Icon: RiUserLine, // ✅ No JSX
  },
  {
    id: 2,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    accountType: "student",
    Icon: LiaBookSolid,
  },
  {
    id: 3,
    name: "Wishlist",
    path: "/dashboard/wishlist",
    accountType: "student",
    Icon: CiBookmark,
  },
  {
    id: 4,
    name: "Purchase History",
    path: "/dashboard/purchase-history",
    accountType: "student",
    Icon: RiHistoryFill,
  },
  {
    id: 5,
    name: "Add Course",
    path: "/dashboard/add-course",
    accountType: "instructor",
    Icon: FaChalkboardTeacher,
  },
  {
    id: 6,
    name: "My Courses",
    path: "/dashboard/my-courses",
    accountType: "instructor",
    Icon: MdOutlineLibraryBooks,
  },
  {
    id: 7,
    name: "Earnings & Payouts",
    path: "/dashboard/earnings",
    accountType: "instructor",
    Icon: RiMoneyDollarCircleLine,
  },
  {
    id: 8,
    name: "Settings",
    path: "/dashboard/settings",
    Icon: IoSettingsOutline,
  },
  {
    id: 9,
    name: "Log Out",
    path: "/logout",
    Icon: FiLogOut,
  },
];

export default dashboardSidebarLinks;
