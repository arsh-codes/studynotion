import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
        trim: true,
    },

    dateOfBirth: {
        type: Date, // Changed from String to Date
    },

    about: {
        type: String,
        trim: true,
        default: "", // Default empty string to avoid undefined values
    },

    contactNumber: {
        type: String,
    },

    profession: {
        type: String,
        default: "Student", // Default profession
    },
});

// Create and export the Profile model
const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
