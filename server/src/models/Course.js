import mongoose from "mongoose";

// Define the schema for the Course model
const CourseSchema = new mongoose.Schema(
    {
        courseName: {
            type: String,
            required: true,
            trim: true,
        },
        courseDescription: {
            type: String,
            required: true,
            trim: true,
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        whatYouWillLearn: {
            type: String,
            required: true,
            trim: true,
        },
        courseContent: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Section",
            },
        ],
        ratingAndReview: [
            { type: mongoose.Schema.Types.ObjectId, ref: "RatingAndReview" },
        ],
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        thumbnailImage: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tag",
            },
        ], // Stores multiple tags as ObjectIds referencing the Tag model
        studentsEnrolled: [
            { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        ],
        instructions: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ["Draft", "Published"],
            default: "Draft",
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Export the Course model using ESM
const Course = mongoose.model("Course", CourseSchema);
export default Course;
