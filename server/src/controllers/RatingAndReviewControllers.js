// This file includes the following controllers:
//
// 1. createRatingAndReview
// 2. getAverageRating
// 3. getAllRatingsAndReviews

import Course from "../models/Course.js";
// Import necessary modules
import RatingAndReview from "../models/RatingAndReview.js";
import mongoose from "mongoose";

/**
 * Create a new rating and review for a course
 */
export const createRatingAndReview = async (req, res) => {
    try {
        // Extract required fields from the request body
        const { courseId, rating, review } = req.body;
        const userId = req.user.id;

        // Validate required fields
        if (!courseId || !userId || !rating || !review) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }

        // Ensure rating is between 1 and 5
        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5",
            });
        }

        // Enforce a minimum length for reviews
        if (review.trim().length < 10) {
            return res.status(400).json({
                success: false,
                message: "Review should be at least 10 characters long.",
            });
        }

        // Check if the user is enrolled in the course
        const course = await Course.findById(courseId);
        if (!course.studentsEnrolled.includes(userId)) {
            return res.status(403).json({
                success: false,
                message: "User is not enrolled in this course",
            });
        }

        // Prevent users from reviewing the same course multiple times
        const existingReview = await RatingAndReview.findOne({
            course: courseId,
            user: userId,
        });
        if (existingReview) {
            return res.status(409).json({
                success: false,
                message: "User already reviewed this course",
            });
        }

        // Create a new rating and review
        const ratingAndReview = await RatingAndReview.create({
            course: courseId,
            user: userId,
            rating,
            review,
        });

        // Associate the review with the course
        course.ratingAndReview.push(ratingAndReview._id);
        await course.save();

        // Respond with success message
        res.status(201).json({
            success: true,
            message: "Review created successfully",
            ratingAndReview,
        });
    } catch (error) {
        console.error("Error creating review:", error); // Log the error for debugging
        res.status(500).json({
            success: false,
            message: "Error creating review",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Internal Server Error",
        });
    }
};

/**
 * Get the average rating of a course
 */
export const getAverageRating = async (req, res) => {
    try {
        const { courseId } = req.params; // Retrieve courseId from URL params

        // Validate the course ID
        if (!courseId) {
            return res
                .status(400)
                .json({ success: false, message: "Course ID is required" });
        }

        // Aggregate function to calculate the average rating
        const result = await RatingAndReview.aggregate([
            { $match: { course: new mongoose.Types.ObjectId(courseId) } },
            { $group: { _id: null, averageRating: { $avg: "$rating" } } },
        ]);

        // Extract average rating, default to 0 if no ratings exist
        const averageRating = result.length ? result[0].averageRating : 0;

        // Respond with the calculated average rating
        res.status(200).json({ success: true, averageRating });
    } catch (error) {
        console.error("Error calculating average rating:", error); // Log the error for debugging
        res.status(500).json({
            success: false,
            message: "Error calculating average rating",
            error: error.message,
        });
    }
};

/**
 * Get all ratings and reviews with pagination support
 */
export const getAllRatingsAndReviews = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Default pagination values

        // Retrieve all reviews with pagination, sorting, and population of user and course details
        const allRatingsAndReviews = await RatingAndReview.find({})
            .skip((page - 1) * limit) // Skip records based on the page number
            .limit(Number(limit)) // Limit the number of records per page
            .sort({ rating: "desc" }) // Sort in descending order of rating
            .populate({ path: "user", select: "firstName lastName email" }) // Populate user details
            .populate({ path: "course", select: "courseName" }) // Populate course details
            .exec();

        // Respond with the fetched reviews
        res.status(200).json({ success: true, reviews: allRatingsAndReviews });
    } catch (error) {
        console.error("Error fetching reviews:", error); // Log the error for debugging
        res.status(500).json({
            success: false,
            message: "Error fetching reviews",
            error: error.message,
        });
    }
};
