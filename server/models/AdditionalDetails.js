const mongoose = require("mongoose"); // Fixed incorrect "required" import

// Define the schema for additional details
const additionalDetailsSchema = new mongoose.Schema({
    gender: {
        type: String,
        required: true,
        trim: true,
        enum: ["Male", "Female", "Other"], // Restricts values to predefined options
    },
    dateOfBirth: {
        type: Date, // Date type is suitable for better date manipulation
    },
    about: {
        type: String,
        trim: true,
    },
    contactNumber: {
        type: String, // String for better formatting (e.g., international numbers)
        required: true,
    },
});

// Export the schema as a Mongoose model
module.exports = mongoose.model("AdditionalDetails", additionalDetailsSchema); // Corrected model name to a string
