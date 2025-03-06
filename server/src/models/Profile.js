import mongoose from "mongoose";

// Define the schema for user profile details
const profileSchema = new mongoose.Schema({
    // Gender field with predefined options
    gender: {
        type: String,
        trim: true,
        enum: ["male", "female", "other"], // Restricts values to these options
    },

    // Date of birth as a string (can be stored in various formats)
    dateOfBirth: {
        type: String,
    },

    // Short bio or description about the user
    about: {
        type: String,
        trim: true,
    },

    // Contact number stored as a string to allow different formats
    contactNumber: {
        type: String,
    },
});

// Create and export the Profile model
const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
