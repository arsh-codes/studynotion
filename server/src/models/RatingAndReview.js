import mongoose from "mongoose";

// Define the schema for Rating and Review
const ratingAndReviewSchema = new mongoose.Schema(
    {
        // Reference to the user who provided the rating/review
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User", // Links to the User model
        },

        // Numerical rating (e.g., 1-5 stars)
        rating: {
            type: Number,
            required: true,
        },

        // Text review associated with the rating
        review: {
            type: String,
            required: true,
            trim: true, // Removes leading/trailing spaces
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt`
    }
);

// Create and export the RatingAndReview model
const RatingAndReview = mongoose.model("RatingAndReview", ratingAndReviewSchema);
export default RatingAndReview;
