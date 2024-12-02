const mongoose = require("mongoose"); // Fixed incorrect "required" import

// Define the schema for additional details
const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
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
    },
});

// Export the schema as a Mongoose model
module.exports = mongoose.model("Profile", profileSchema); // Corrected model name to a string
