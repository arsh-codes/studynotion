import {
  setAuthLoading,
  setIsLoggedIn,
  setToken,
} from "@redux/slices/authSlice";

import { apiConnector } from "@services/apiConnector";
import { endpoints } from "@services/apis";
import { resetCart } from "@redux/slices/cartSlice";
import { setUser } from "@redux/slices/profileSlice";
import { toast } from "react-hot-toast";

// Extract API endpoints from the endpoints object
const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

/**
 * Sends an OTP to the given email for verification.
 * @param {string} email - The user's email address.
 * @param {function} navigate - React Router's navigate function to redirect pages.
 */
export function sendOtp(email, navigate) {
  // ✅ Pass navigate as an argument
  return async (dispatch) => {
    const toastId = toast.loading("Sending OTP...");
    dispatch(setAuthLoading(true));

    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });

      console.log("SEND OTP API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP sent successfully! Check your email.");
      if (navigate) navigate("/verify-email");
    } catch (error) {
      console.log("SEND OTP API ERROR:", error);
      toast.error("Failed to send OTP. Please try again.");
    }

    dispatch(setAuthLoading(false));
    toast.dismiss(toastId);
  };
}

/**
 * Handles user signup.
 * @param {object} signupData - The signup data entered by the user.
 * @param {function} navigate - React Router's navigate function for redirection.
 */
export function signup(signupData, navigate) {
  return async (dispatch) => {
    const {
      accountType,
      firstName,
      lastName,
      countryCode,
      email,
      password,
      confirmPassword,
      otp,
    } = signupData;

    const toastId = toast.loading("Creating your account...");
    dispatch(setAuthLoading(true));

    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        countryCode,
        password,
        confirmPassword,
        otp,
      });

      console.log("SIGNUP API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Account created successfully! You can now log in.");
      if (navigate) navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR:", error);
      toast.error("Signup failed. Please check your details and try again.");

      if (navigate) navigate("/signup");
    }

    dispatch(setAuthLoading(false));
    toast.dismiss(toastId);
  };
}

/**
 * Handles user login.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {function} navigate - React Router's navigate function for redirection.
 */
export function login(email, password, navigate) {
  // ✅ Pass navigate properly
  return async (dispatch) => {
    const toastId = toast.loading("Logging in...");
    dispatch(setAuthLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success(`Welcome back, ${response.data.user.firstName}!`);
      dispatch(setToken(response.data.token));

      // Set user image, use a placeholder if not provided
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

      dispatch(setUser({ ...response.data.user, image: userImage }));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));

      if (navigate) navigate("/dashboard/my-profile"); // ✅ Ensure navigate exists

      setIsLoggedIn(true);
    } catch (error) {
      console.log("LOGIN API ERROR:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    }

    dispatch(setAuthLoading(false));
    toast.dismiss(toastId);
  };
}

/**
 * Logs the user out by clearing authentication state and redirecting to the homepage.
 * @param {function} navigate - React Router's navigate function.
 */
export function logout(navigate) {
  // ✅ Pass navigate from components
  return (dispatch) => {
    try {
      toast.success("You have been logged out.");
      dispatch(setToken(null));
      dispatch(setUser(null));
      dispatch(resetCart());
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (navigate) navigate("/");
    } catch (error) {
      console.log("LOGOUT ERROR:", error);
      toast.error("Logout failed. Please try again.");
    }
  };
}

/**
 * Sends a password reset token to the user's email.
 * @param {string} email - The user's email address.
 * @param {function} setEmailSent - A function to update the UI when the email is sent.
 */
export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setAuthLoading(true));

    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });

      console.log("RESET PASSWORD TOKEN RESPONSE:", response);

      if (response.status === 404) {
        toast.error("User not found. Please check the email entered.");
        dispatch(setAuthLoading(false));
        return;
      }

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password reset email sent! Check your inbox.");
      setEmailSent(true);
    } catch (error) {
      console.log("RESET PASSWORD TOKEN ERROR:", error);
      toast.error(
        error.message || "Failed to send reset email. Please try again.",
      );
    }

    dispatch(setAuthLoading(false));
  };
}

/**
 * Resets the user's password using a reset token.
 * @param {string} newPassword - The new password.
 * @param {string} confirmPassword - The confirmation of the new password.
 * @param {string} resetPasswordToken - The token received via email.
 */
export function resetPassword(
  newPassword,
  confirmPassword,
  resetPasswordToken,
) {
  return async (dispatch) => {
    dispatch(setAuthLoading(true));

    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        newPassword,
        confirmPassword,
        resetPasswordToken,
      });

      console.log("RESET PASSWORD RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Your password has been reset successfully!");
    } catch (error) {
      console.log("RESET PASSWORD ERROR:", error);
      toast.error("Password reset failed. Please try again.");
    }

    dispatch(setAuthLoading(false));
  };
}
