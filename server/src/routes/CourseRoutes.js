// Import middleware for authorization
import {
    auth,
    isAdmin,
    isInstructor,
    isStudent,
} from "../middlewares/authorizationMiddleware.js";
// Import controllers
import {
    createCategory,
    getCategoryPageDetails,
    showAllCategories,
} from "../controllers/CategoryControllers.js";
import {
    createCourse,
    getAllCourses,
    getCourseDetails,
} from "../controllers/CourseControllers.js";
import {
    createRatingAndReview,
    getAllRatingsAndReviews,
    getAverageRating,
} from "../controllers/RatingAndReviewControllers.js";
import {
    createSection,
    deleteSection,
    updateSection,
} from "../controllers/SectionControllers.js";
import {
    createSubSection,
    deleteSubSection,
    updateSubSection,
} from "../controllers/SubSectionControllers.js";
import { createTag, showAllTags } from "../controllers/TagControllers.js";

// Import necessary modules
import express from "express";

// Create an Express router
const router = express.Router();

// ********************************************************************
//                          Course Routes
// ********************************************************************

// Course management (only instructors can create courses)
router.post("/createCourse", auth, isInstructor, createCourse);

// Section management (only instructors)
router.post("/addSection", auth, isInstructor, createSection);
router.put("/updateSection", auth, isInstructor, updateSection);
router.delete("/deleteSection", auth, isInstructor, deleteSection);

// Sub-section management (only instructors)
router.post("/addSubSection", auth, isInstructor, createSubSection);
router.put("/updateSubSection", auth, isInstructor, updateSubSection);
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);

// Course details and listings
router.get("/getAllCourses", getAllCourses);
router.post("/getCourseDetails", getCourseDetails);

// ********************************************************************
//                        Category & Tag Routes
// ********************************************************************

// Category management (only admins)
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.get("/getCategoryPageDetails", getCategoryPageDetails);

// Tag management (only admins)
router.post("/createTag", auth, isAdmin, createTag);
router.get("/showAllTags", showAllTags);

// ********************************************************************
//                     Rating & Review Routes
// ********************************************************************

// Only students can add ratings & reviews
router.post("/createRating", auth, isStudent, createRatingAndReview);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRatingsAndReviews);

// Export the router
export default router;
