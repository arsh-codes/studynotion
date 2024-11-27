const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const mongoose = require("mongoose");
min: 1, // Ensures that the rating is between 1 and 5
max: 5, // Limits rating to a maximum of 5
exports.createRatingAndReview = async (req, res) => {
    try {
        const { courseId, rating, review } = req.body;
        const userId = req.user.id;

        if (!courseId || !userId || !rating || !review) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
        }

        if (review.trim().length < 10) {  // Enforcing a minimum length for reviews
            return res.status(400).json({
                success: false,
                message: "Review should be at least 10 characters long.",
            });
        }

        const course = await Course.findById(courseId);
        if (!course.studentsEnrolled.includes(userId)) {
            return res.status(403).json({ success: false, message: "User is not enrolled in this course" });
        }

        const existingReview = await RatingAndReview.findOne({ course: courseId, user: userId });
        if (existingReview) {
            return res.status(409).json({ success: false, message: "User already reviewed this course" });
        }

        const ratingAndReview = await RatingAndReview.create({ course: courseId, user: userId, rating, review });
        course.ratingAndReview.push(ratingAndReview._id);
        await course.save();

        res.status(201).json({ success: true, message: "Review created successfully", ratingAndReview });
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({
            success: false,
            message: "Error creating review",
            error: process.env.NODE_ENV === 'development' ? error.message : "Internal Server Error",
        });
    }
};

exports.getAverageRating = async (req, res) => {
    try {
        const { courseId } = req.params;  // Changed to req.params for better RESTful structure

        if (!courseId) {
            return res.status(400).json({ success: false, message: "Course ID is required" });
        }

        const result = await RatingAndReview.aggregate([
            { $match: { course: mongoose.Types.ObjectId(courseId) } },
            { $group: { _id: null, averageRating: { $avg: "$rating" } } },
        ]);

        const averageRating = result.length ? result[0].averageRating : 0;

        res.status(200).json({ success: true, averageRating });
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({
            success: false,
            message: "Error calculating average rating",
            error: error.message,
        });
    }
};

exports.getAllRatingsAndReviews = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;  // Pagination support
        const allRatingsAndReviews = await RatingAndReview.find({})
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ rating: "desc" })
            .populate({ path: "user", select: "firstName lastName email" })
            .populate({ path: "course", select: "courseName" })
            .exec();

        res.status(200).json({ success: true, reviews: allRatingsAndReviews });
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({
            success: false,
            message: "Error fetching reviews",
            error: error.message,
        });
    }
};
