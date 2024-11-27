const mongoose = require("mongoose");

// Define the schema for Rating and Review
const ratingAndReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields to track when reviews are made or modified
});

// Export the schema as a Mongoose model
module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);
