import {
    deleteAccount,
    getEnrolledCourses,
    getUserDetails,
    updateDisplayPicture,
    updateProfile,
} from "../controllers/ProfileControllers.js";

import { auth } from "../middlewares/authorizationMiddleware.js";
// Import required modules
import express from "express";

// Create an Express router
const router = express.Router();

// ********************************************************************
//                           Profile Routes
// ********************************************************************

// 1. Delete user account
router.delete("/deleteAccount", auth, deleteAccount);

// 2. Update user profile details
router.put("/updateProfile", auth, updateProfile);

// 3. Fetch user details
router.get("/getUserDetails", auth, getUserDetails);

// 4. Get enrolled courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);

// 5. Update user's display picture
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

// Export the router
export default router;
