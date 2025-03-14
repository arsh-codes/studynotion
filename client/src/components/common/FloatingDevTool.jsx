import React, { useEffect, useState } from "react";
// Services & Redux
import { login, logout } from "@client/services/operations/authAPI";
import { setAuthLoading, setIsLoggedIn } from "@redux/slices/authSlice";
import { setProfileLoading, setUser } from "@redux/slices/profileSlice";
import { useDispatch, useSelector } from "react-redux";

// Icons
import { FaTools } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { checkConnection } from "@services/operations/checkConnectionAPI";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const FloatingDevTool = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State Management
  const [isOpen, setIsOpen] = useState(false);
  const [loginAs, setLoginAs] = useState("student");

  // Redux Store Selectors
  const { authLoading, isLoggedIn } = useSelector((state) => state.auth);
  const { profileLoading } = useSelector((state) => state.profile);
  const { isConnected } = useSelector((state) => state.connection);

  // Environment Variables for Sample Login Data
  const loginData = {
    studentEmail: import.meta.env.VITE_SAMPLE_STUDENT_EMAIL,
    studentPassword: import.meta.env.VITE_SAMPLE_STUDENT_PASSWORD,
    instructorEmail: import.meta.env.VITE_SAMPLE_INSTRUCTOR_EMAIL,
    instructorPassword: import.meta.env.VITE_SAMPLE_INSTRUCTOR_PASSWORD,
  };

  // Check backend connection on component mount
  useEffect(() => {
    dispatch(checkConnection());
  }, [dispatch]);

  // Handlers
  const handleAuthLoadingSwitch = () => {
    dispatch(setAuthLoading(!authLoading));
    console.log("Auth loading toggled:", !authLoading);
  };

  const handleProfileLoadingSwitch = () => {
    dispatch(setProfileLoading(!profileLoading));
    console.log("Profile loading toggled:", !profileLoading);
  };

  const handleLoginToggle = () => {
    if (isLoggedIn) {
      dispatch(logout(navigate));
    }

    // Toggle between student and instructor login
    setLoginAs((prev) => (prev === "student" ? "instructor" : "student"));

    const email =
      loginAs === "student"
        ? loginData.studentEmail
        : loginData.instructorEmail;
    const password =
      loginAs === "student"
        ? loginData.studentPassword
        : loginData.instructorPassword;

    dispatch(login(email, password, navigate));

    console.log(`Logged in as ${loginAs}`);
  };

  // Common button styles
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
            {/* Tools Icon */}
            <FaTools
              size={24}
              className={`absolute transition-transform duration-500 ease-in-out ${
                isOpen
                  ? "scale-0 rotate-90 opacity-0"
                  : "scale-100 rotate-0 opacity-100"
              }`}
            />
            {/* Close Icon */}
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

        {/* Expanded Menu */}
        <div
          className={`text-richblack-5 bg-richblack-800 absolute bottom-14 left-0 flex w-50 transform flex-col gap-2 rounded-lg p-2 shadow-lg transition-all duration-500 ease-in-out ${
            isOpen
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible translate-y-5 scale-90 opacity-0"
          }`}
        >
          {/* Control Buttons */}
          <button onClick={handleAuthLoadingSwitch} className={buttonClass}>
            {authLoading ? "Stop Auth Loading" : "Start Auth Loading"}
          </button>
          <button onClick={handleProfileLoadingSwitch} className={buttonClass}>
            {profileLoading ? "Stop Profile Loading" : "Start Profile Loading"}
          </button>
          <button onClick={handleLoginToggle} className={buttonClass}>
            {loginAs === "student" ? "Login as Student" : "Login as Instructor"}
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
