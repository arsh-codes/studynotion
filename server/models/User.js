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
        minlength: 2,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true, // Automatically convert email to lowercase
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    token: {
        type: String,
    },
    resetPasswordTokenExpires: {
        type: Date,
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
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    }],
    courseProgress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseProgress",
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create and export the User model
module.exports = mongoose.model("User", userSchema);
