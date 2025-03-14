import CtaButton from "@components/core/HomePage/CtaButton";
import { GrCircleAlert } from "react-icons/gr";
import React from "react";
import { logout } from "@services/operations/authAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function ConfirmationModal({ modalIsOpen, setModalIsOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout() {
    dispatch(logout(navigate));
    console.log("📝 -> handleLogout -> logout=", logout);
  }

  function handleCancelButton() {
    setModalIsOpen(false);
    console.log("📝 -> handleCancelButton -> setModalIsOpen=", setModalIsOpen);
  }

  if (!modalIsOpen) return null;
  return (
    <div className="absolute top-0 right-0 left-0 z-40 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
      <div className="bg-richblack-800 absolute z-50 flex flex-col gap-4 rounded-md px-6 py-6">
        <div className="flex flex-col gap-1">
        <GrCircleAlert className="h-8 w-8" />
          <p className="text-richblack-5 text-2xl font-semibold">
            Are you sure?
          </p>
          <p className="text-richblack-300">
            You will be logged out of your account.
          </p>
        </div>
        <div className="flex gap-6">
          <button
            className="text-richblack-900 flex w-fit cursor-pointer items-center rounded-lg bg-yellow-50 px-7 py-3 text-center text-base font-medium shadow-md"
            onClick={handleLogout}
          >
            Log Out
          </button>
          <button
            className="bg-richblack-600 text-richblack-5 flex w-fit cursor-pointer items-center rounded-lg px-8 py-3 text-center text-base font-medium shadow-md"
            onClick={handleCancelButton}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
