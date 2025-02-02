const mongoose = require("mongoose");

// Define the schema for categories
const categorySchema = new mongoose.Schema(
    {
        categoryName: {
            type: String,
            required: true,
            trim: true,
        },
        categoryDescription: {
            type: String,
            trim: true,
        },
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
            },
        ],
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);

// Export the schema as a Mongoose model
module.exports = mongoose.model("Category", categorySchema);
