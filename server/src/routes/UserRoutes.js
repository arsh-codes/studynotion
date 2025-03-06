import {
    changePassword,
    resetPassword,
    resetPasswordTokenMail,
} from "../controllers/PasswordControllers.js";
import {
    login,
    sendOtp,
    signup,
} from "../controllers/AuthenticationControllers.js";

import { auth } from "../middlewares/authorizationMiddleware.js";
// Import required modules
import express from "express";

// Create an Express router
const router = express.Router();

// ********************************************************************
//                        Authentication Routes
// ********************************************************************

// User login
router.post("/login", login);

// User signup
router.post("/signup", signup);

// Send OTP to user's email
router.post("/sendotp", sendOtp);

// ********************************************************************
//                        Password Reset Routes
// ********************************************************************

// Generate a reset password token
router.post("/resetPasswordTokenMail", resetPasswordTokenMail);

// Reset password after token verification
router.post("/resetPassword", resetPassword);

// ********************************************************************
//                        Change Password Route
// ********************************************************************

// Change password (requires authentication)
router.post("/changePassword", auth, changePassword);

// Export the router
export default router;
