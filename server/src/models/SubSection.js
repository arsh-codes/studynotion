const mongoose = require("mongoose");

// Define the SubSection schema
const SubSectionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        timeDuration: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            trim: true,
        },
        videoUrl: {
            type: String,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Create and export the SubSection model
module.exports = mongoose.model("SubSection", SubSectionSchema);
