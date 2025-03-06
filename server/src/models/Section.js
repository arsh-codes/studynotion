import mongoose from "mongoose";

// Define the Section schema
const sectionSchema = new mongoose.Schema(
    {
        // Name of the section
        sectionName: {
            type: String,
            required: true,
            trim: true, // Removes leading/trailing spaces
        },

        // Array of subsections associated with this section
        subSection: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "SubSection", // References the SubSection model
            },
        ],
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt`
    }
);

// Create and export the Section model
const Section = mongoose.model("Section", sectionSchema);
export default Section;
