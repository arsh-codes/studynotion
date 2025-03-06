import { setLoading, setToken } from "../../Redux/slices/authSlice";

import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { resetCart } from "../../Redux/slices/cartSlice";
import { setUser } from "../../Redux/slices/profileSlice";
import { toast } from "react-hot-toast";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Sending OTP...");
    dispatch(setLoading(true));
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
      navigate("/verify-email");
    } catch (error) {
      console.log("SEND OTP API ERROR:", error);
      toast.error("Failed to send OTP. Please try again.");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signup(
  accountType,
  firstName,
  lastName,
  countryCode,
  email,
  password,
  confirmPassword,
  otp,
  navigate,
) {
  return async (dispatch) => {
    const toastId = toast.loading("Creating your account...");
    dispatch(setLoading(true));
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
      toast.success("Account created successfully! You can now log in.");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR:", error);
      toast.error("Signup failed. Please check your details and try again.");
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Logging in...");
    dispatch(setLoading(true));
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
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      dispatch(setUser({ ...response.data.user, image: userImage }));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN API ERROR:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("You have been logged out.");
    navigate("/");
  };
}
export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });

      console.log("RESET PASSWORD TOKEN RESPONSE:", response);

      if (response.status === 404) {
        toast.error("User not found. Please check the email entered.");
        dispatch(setLoading(false));
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
    dispatch(setLoading(false));
  };
}

export function resetPassword(
  newPassword,
  confirmPassword,
  resetPasswordToken,
) {
  return async (dispatch) => {
    dispatch(setLoading(true));
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
    dispatch(setLoading(false));
  };
}
