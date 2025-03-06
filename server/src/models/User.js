import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema(
    {
        // User's first name
        firstName: {
            type: String,
            required: true,
            trim: true, // Removes leading and trailing whitespaces
        },
        // User's last name
        lastName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2, // Ensures last name has at least 2 characters
            maxlength: 100, // Prevents excessively long names
        },
        // User's email (must be unique)
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true, // Converts email to lowercase for consistency
        },
        // Hashed password of the user
        password: {
            type: String,
            required: true,
            trim: true,
        },
        // Reset password token (used for password recovery)
        resetPasswordToken: {
            type: String,
        },
        resetPasswordTokenExpires: {
            type: Date,
        },
        // User role (Admin, Student, or Instructor)
        accountType: {
            type: String,
            required: true,
            enum: ["admin", "student", "instructor"], // Restricts values to predefined roles
            trim: true,
        },
        // Profile image URL
        image: {
            type: String,
            required: true,
        },
        // Reference to the user's additional details (Profile schema)
        additionalDetails: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile",
            required: true,
        },
        // Courses that the user has enrolled in or created (for instructors)
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course",
            },
        ],
        // Tracking the progress of a course (if the user is a student)
        courseProgress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseProgress",
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);

// Create and export the User model
const User = mongoose.model("User", userSchema);
export default User;
