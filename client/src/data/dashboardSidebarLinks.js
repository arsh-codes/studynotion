import {
  RiHistoryFill,
  RiMoneyDollarCircleLine,
  RiUserLine,
} from "react-icons/ri";

import { CiBookmark } from "react-icons/ci";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { RiShoppingCart2Line } from "react-icons/ri";

const dashboardSidebarLinks = [
  {
    id: 1,
    title: "My Profile",
    path: "/dashboard/my-profile",
    Icon: RiUserLine,
  },

  {
    id: 2,
    title: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    accountType: "student",
    Icon: LiaBookSolid,
  },
  {
    id: 3,
    title: "Wishlist",
    path: "/dashboard/wishlist",
    accountType: "student",
    Icon: CiBookmark,
  },
  {
    id: 4,
    title: "My Cart",
    path: "/dashboard/cart",
    accountType: "student",
    Icon: RiShoppingCart2Line,
  },
  {
    id: 5,
    title: "Purchase History",
    path: "/dashboard/purchase-history",
    accountType: "student",
    Icon: RiHistoryFill,
  },
  {
    id: 6,
    title: "Add Course",
    path: "/dashboard/add-course",
    accountType: "instructor",
    Icon: FaChalkboardTeacher,
  },
  {
    id: 7,
    title: "My Courses",
    path: "/dashboard/my-courses",
    accountType: "instructor",
    Icon: MdOutlineLibraryBooks,
  },
  {
    id: 8,
    title: "Earnings & Payouts",
    path: "/dashboard/earnings",
    accountType: "instructor",
    Icon: RiMoneyDollarCircleLine,
  },
  {
    id: 9,
    title: "Settings",
    path: "/dashboard/settings",
    Icon: IoSettingsOutline,
  },
];

export default dashboardSidebarLinks;
