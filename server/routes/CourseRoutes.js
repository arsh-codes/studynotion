// Import the required modules
const express = require("express");
const router = express.Router();

// Import Controllers

// Course Controllers Import
const {
    createCourse,
    getAllCourses,
    getCourseDetails,
} = require("../controllers/CourseControllers");

// Categories Controllers Import
const {
    showAllCategories,
    createCategory,
    getCategoryPageDetails,
} = require("../controllers/CategoryControllers");

// Tags Controllers Import
const { createTag, showAllTags } = require("../controllers/TagControllers");

// Sections Controllers Import
const {
    createSection,
    updateSection,
    deleteSection,
} = require("../controllers/SectionControllers");

// Sub-Sections Controllers Import
const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
} = require("../controllers/SubSectionControllers");

// Rating Controllers Import
const {
    createRatingAndReview,
    getAverageRating,
    getAllRatingsAndReviews,
} = require("../controllers/RatingAndReviewControllers");

// Import Middlewares
const {
    auth,
    isInstructor,
    isStudent,
    isAdmin,
} = require("../middlewares/authorizationMiddleware");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can only be created by instructors
router.post("/createCourse", auth, isInstructor, createCourse); // Endpoint to create a course

// Section management for instructors
router.post("/addSection", auth, isInstructor, createSection); // Add a section
router.post("/updateSection", auth, isInstructor, updateSection); // Update a section
router.post("/deleteSection", auth, isInstructor, deleteSection); // Delete a section

// Sub-section management for instructors
router.post("/addSubSection", auth, isInstructor, createSubSection); // Add a sub-section
router.post("/updateSubSection", auth, isInstructor, updateSubSection); // Edit a sub-section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection); // Delete a sub-section

// Course details and listing
router.get("/getAllCourses", getAllCourses); // Retrieve all registered courses
router.post("/getCourseDetails", getCourseDetails); // Get details for a specific course

// ********************************************************************************************************
//                                      Category and tag routes
// ********************************************************************************************************

// Category management by admin
router.post("/createCategory", auth, isAdmin, createCategory); // Create a category
router.get("/showAllCategories", showAllCategories); // List all categories
router.post("/createTag", auth, isAdmin, createTag); // Create a tag
router.get("/showAllTags", showAllTags); // List all Tags
router.get("/getCategoryPageDetails", getCategoryPageDetails); // Get details for a category page

// ********************************************************************************************************
//                                      Rating and Review routes
// ********************************************************************************************************

// Students can create ratings and reviews
router.post("/createRating", auth, isStudent, createRatingAndReview); // Add a rating
router.get("/getAverageRating", getAverageRating); // Fetch the average rating
router.get("/getReviews", getAllRatingsAndReviews); // Get all reviews

// Export the router
module.exports = router;
