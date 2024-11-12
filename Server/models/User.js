const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true, // Automatically trims leading and trailing whitespaces
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true, // Optionally convert email to lowercase
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    accountType: {
        type: String,
        required: true,
        enum: ["admin", "student", "instructor"],
        trim: true,
    },
    image: {
        type: String,
        required: true,
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true,
    },
    courses: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    couseProgress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseProgress",
    },
});

// Create a model based on the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
