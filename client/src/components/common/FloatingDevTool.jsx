import React, { useEffect, useState } from "react";
import { setAuthLoading, setIsLoggedIn } from "@redux/slices/authSlice";
import { setProfileLoading, setUser } from "@redux/slices/profileSlice";
import { useDispatch, useSelector } from "react-redux";

import { FaTools } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { checkConnection } from "@services/operations/checkConnectionAPI";

const FloatingDevTool = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const { authLoading, isLoggedIn } = useSelector((state) => state.auth);
  const { profileLoading, user } = useSelector((state) => state.profile);
  const { isConnected } = useSelector((state) => state.connection); // Use Redux connection state

  // Check backend connection on component mount
  useEffect(() => {
    dispatch(checkConnection());
  }, [dispatch]);

  function handleAuthLoadingSwitch() {
    dispatch(setAuthLoading(!authLoading));
    console.log("Auth loading toggled:", !authLoading);
  }

  function handleProfileLoadingSwitch() {
    dispatch(setProfileLoading(!profileLoading));
    console.log("Profile loading toggled:", !profileLoading);
  }

  function handleAuthToggle() {
    dispatch(setIsLoggedIn(!isLoggedIn));
    console.log("Login status toggled:", !isLoggedIn);
  }

  function handleAccountTypeToggle() {
    if (!user) {
      console.warn("No user found. Cannot toggle account type.");
      return;
    }
    const newAccountType =
      user.accountType === "student" ? "instructor" : "student";
    dispatch(setUser({ ...user, accountType: newAccountType }));
    console.log(
      `Account type changed: ${user.accountType} → ${newAccountType}`,
    );
  }

  const buttonClass =
    "bg-richblack-800 hover:bg-richblack-700 block w-full rounded border border-richblack-700 px-4 py-2 text-center font-medium transition-transform duration-300 active:scale-[97%]";

  return (
    <div className="fixed bottom-5 left-5 z-50">
      <div className="relative">
        {/* Floating Icon Button */}
        <button
          aria-label="Toggle Developer Tools"
          className="bg-richblack-600 text-richblack-5 relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="relative flex h-full w-full items-center justify-center">
            <FaTools
              size={24}
              className={`absolute transition-transform duration-500 ease-in-out ${
                isOpen
                  ? "scale-0 rotate-90 opacity-0"
                  : "scale-100 rotate-0 opacity-100"
              }`}
            />
            <IoMdClose
              size={24}
              className={`absolute transition-transform duration-500 ease-in-out ${
                isOpen
                  ? "scale-100 rotate-0 opacity-100"
                  : "scale-0 rotate-90 opacity-0"
              }`}
            />
          </div>
        </button>

        {/* Expanded Menu with Smooth Animation */}
        <div
          className={`text-richblack-5 bg-richblack-800 absolute bottom-14 left-0 flex w-50 transform flex-col gap-2 rounded-lg p-2 shadow-lg transition-all duration-500 ease-in-out ${
            isOpen
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible translate-y-5 scale-90 opacity-0"
          }`}
        >
          {/* Buttons */}
          <button onClick={handleAuthLoadingSwitch} className={buttonClass}>
            {authLoading ? "Stop Auth Loading" : "Start Auth Loading"}
          </button>
          <button onClick={handleProfileLoadingSwitch} className={buttonClass}>
            {profileLoading ? "Stop Profile Loading" : "Start Profile Loading"}
          </button>
          <button onClick={handleAccountTypeToggle} className={buttonClass}>
            {user?.accountType === "student"
              ? "Switch to Instructor"
              : "Switch to Student"}
          </button>
          <button onClick={handleAuthToggle} className={buttonClass}>
            {isLoggedIn ? "Logout" : "Login"}
          </button>
          {/* Backend Connection Status */}
          <div className="bg-richblack-700 block w-full rounded px-4 py-2 text-center font-medium">
            <p>Backend status:</p>
            {isConnected ? (
              <div className="flex items-center justify-center gap-2">
                <GoDotFill className="text-green-500" />
                Connected
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <GoDotFill className="text-red-500" />
                Not Connected
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingDevTool;
