import mongoose from "mongoose";

// Define the schema for the Tag model
const tagSchema = new mongoose.Schema(
    {
        // Name of the tag (e.g., "JavaScript", "React", "MongoDB")
        tagName: {
            type: String,
            required: true, // Ensures that a tag name is always provided
            trim: true, // Removes leading and trailing spaces
            unique: true, // Prevents duplicate tag names
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);

// Create and export the Tag model using ESM
const Tag = mongoose.model("Tag", tagSchema);
export default Tag;
