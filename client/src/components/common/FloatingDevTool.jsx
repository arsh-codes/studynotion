import React, { useState } from "react";
import { setAuthLoading, setIsLoggedIn } from "@redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

import { FaTools } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const FloatingDevTool = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { authLoading, isLoggedIn } = useSelector((state) => state.auth);

  function handleLoadingSwitch() {
    dispatch(setAuthLoading(!authLoading));
    console.log("Auth loading toggled:", !authLoading);
  }

  function handleAuthToggle() {
    dispatch(setIsLoggedIn(!isLoggedIn));
  }

  return (
    <div className="fixed bottom-5 left-5 z-50">
      <div className="relative">
        {/* Floating Icon Button */}
        <button
          className="bg-richblack-700 text-richblack-5 relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="relative flex h-full w-full items-center justify-center">
            {/* Tools Icon */}
            <FaTools
              size={24}
              className={`absolute transition-transform duration-500 ${
                isOpen
                  ? "scale-0 rotate-90 opacity-0"
                  : "scale-100 rotate-0 opacity-100"
              }`}
            />

            {/* Close Icon */}
            <IoMdClose
              size={24}
              className={`absolute transition-transform duration-500 ${
                isOpen
                  ? "scale-100 rotate-0 opacity-100"
                  : "scale-0 rotate-90 opacity-0"
              }`}
            />
          </div>
        </button>

        {/* Expanded Menu with Smooth Animation */}
        <div
          className={`text-richblack-5 absolute bottom-14 left-0 flex transform flex-col gap-2 rounded-lg p-2 shadow-lg transition-all duration-500 ${
            isOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-3 scale-90 opacity-0"
          }`}
        >
          <button
            onClick={handleLoadingSwitch}
            className="bg-richblack-800 hover:bg-richblack-700 border-richblack-700 block w-full rounded border px-4 py-2 text-center font-medium transition-transform duration-300 active:scale-[97%]"
          >
            {authLoading ? "Stop Auth Loading" : "Start Auth Loading"}
          </button>
          <button
            onClick={handleAuthToggle}
            className="bg-richblack-800 hover:bg-richblack-700 border-richblack-700 block w-full rounded border px-4 py-2 text-center font-medium transition-transform duration-300 active:scale-[97%]"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingDevTool;
