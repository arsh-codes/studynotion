// Import the required modules
const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions
const {
    login,
    signup,
    sendOtp,
} = require("../controllers/AuthenticationControllers");
const {
    changePassword,
    resetPasswordTokenMail,
    resetPassword,
} = require("../controllers/PasswordControllers");
const { auth } = require("../middlewares/authorizationMiddleware");

// ********************************************************************************************************
//                                      Authentication Routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/signup", signup);

// Route for sending OTP to the user's email
router.post("/sendotp", sendOtp);

// ********************************************************************************************************
//                                      Password Reset Routes
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/resetPasswordTokenMail", resetPasswordTokenMail);

// Route for resetting user's password after token verification
router.post("/resetPassword", resetPassword);

// ********************************************************************************************************
//                                      Change Password Route
// ********************************************************************************************************

// Route for changing the user's password (requires authentication)
router.post("/changePassword", auth, changePassword);

// Export the router for use in the main application
module.exports = router;
