import mongoose from "mongoose";

// Define the SubSection schema
const subSectionSchema = new mongoose.Schema(
    {
        // Title of the subsection
        title: {
            type: String,
            required: true,
            trim: true, // Removes leading/trailing spaces for consistency
        },

        // Duration of the video in this subsection
        timeDuration: {
            type: String, // Stored as a string (e.g., "10:30" for 10 minutes, 30 seconds)
            required: true,
        },

        // Optional description of the subsection
        description: {
            type: String,
            trim: true,
        },

        // URL of the associated video (e.g., hosted on Cloudinary)
        videoUrl: {
            type: String,
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt`
    }
);

// Create and export the SubSection model
const SubSection = mongoose.model("SubSection", subSectionSchema);
export default SubSection;
