// Import the required modules
const express = require("express");
const router = express.Router();

// Import Middleware
const { auth } = require("../middlewares/authorizationMiddleware");

// Import Profile Controllers
const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    updateDisplayPicture,
    getEnrolledCourses,
} = require("../controllers/ProfileControllers");

// ********************************************************************************************************
//                                      Profile Routes
// ********************************************************************************************************

// Delete user account
router.delete("/deleteAccount", auth, deleteAccount);

// Update user profile details
router.put("/updateProfile", auth, updateProfile);

// Fetch all user details
router.get("/getUserDetails", auth, getAllUserDetails);

// Get the list of enrolled courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);

// Update the user's display picture
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

// Export the router to be used in the main application
module.exports = router;
