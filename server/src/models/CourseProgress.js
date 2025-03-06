import mongoose from "mongoose";

// Define the schema for tracking course progress
const courseProgressSchema = new mongoose.Schema(
    {
        // Reference to the course for which progress is being tracked
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course", // Links to the 'Course' model
            required: true, // Ensures every progress entry is tied to a course
        },

        // Array of completed video sections (subsections of the course)
        completedVideos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SubSection", // Links to the 'SubSection' model
            },
        ],
    },
    {
        timestamps: true, // Automatically manages `createdAt` and `updatedAt` timestamps
    }
);

// Create and export the CourseProgress model
const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);
export default CourseProgress;
