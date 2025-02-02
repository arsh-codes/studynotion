// This file includes the following controllers:
// 1. updateProfile
// 2. deleteAccount
// 3. getUserDetails
// 4. updateDisplayPicture
// 5. getEnrolledCourses

const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const cloudinaryUploader = require("../utils/cloudinaryUploader");

exports.updateProfile = async (req, res) => {
    try {
        const { gender, dateOfBirth, about, contactNumber } = req.body;
        const userId = req.user.id; // Assuming userId is added by authentication middleware

        // Validate required inputs
        if (!gender || !contactNumber) {
            return res.status(400).json({
                success: false,
                message:
                    "Gender and contact number are required to update your profile.",
            });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "The requested user account was not found.",
            });
        }

        // Find and update additional details
        const profile = await Profile.findById(user.additionalDetails);
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile details could not be found.",
            });
        }

        // Update profile fields with provided values
        profile.contactNumber = contactNumber;
        profile.gender = gender;
        if (dateOfBirth) profile.dateOfBirth = dateOfBirth;
        if (about) profile.about = about;

        const updatedDetails = await profile.save();

        return res.status(200).json({
            success: true,
            message: "Your profile has been updated successfully.",
            profile: updatedDetails, // Fixed: Changed key 'Profile' to lowercase 'profile' for consistency with convention
        });
    } catch (error) {
        console.error(`Error in updateProfile: ${error.message}`);
        return res.status(500).json({
            success: false,
            message:
                "We encountered an issue while updating your profile. Please try again later.",
        });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "The requested user account was not found.",
            });
        }
        // Remove user from courses
        if (Array.isArray(user.courses) && user.courses.length > 0) {
            // Loop through each courseId in the user's courses array.
            for (const courseId of user.courses) {
                // The $pull operator removes the specified value (userId) from the array field 'userId' in the course document.
                await Course.findByIdAndUpdate(courseId, { $pull: { userId } });
            }
        }

        // Delete associated additional details
        if (user.additionalDetails) {
            await Profile.findByIdAndDelete(user.additionalDetails);
        }

        // Delete user account
        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success: true,
            message:
                "Your account has been deleted successfully. We hope to see you again!",
        });
    } catch (error) {
        console.error(`Error in deleteAccount: ${error.message}`);
        return res.status(500).json({
            success: false,
            message:
                "We encountered an error while trying to delete your account. Please try again later.",
        });
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;

        // Attempt to retrieve the user and populate necessary fields
        const user = await User.findById(userId)
            .populate("additionalDetails")
            .populate("courses") // Populate enrolled courses
            .populate("courseProgress");

        // Check if the user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message:
                    "The requested user does not exist. Please verify the user ID.",
            });
        }
        //Explicitly omitting the password for security purposes
        user.password = undefined;

        return res.status(200).json({
            success: true,
            message: "User details fetched successfully.",
            user,
        });
    } catch (error) {
        console.error("Error in getUserDetails:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch user details. Please try again later.",
        });
    }
};
exports.updateDisplayPicture = async (req, res) => {
    try {
        const { displayPicture } = req.files;
        const userId = req.user.id;

        // Ensure display picture is provided
        if (!displayPicture) {
            return res.status(400).json({
                success: false,
                message: "Display picture is required.",
            });
        }

        // Fetch the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Use the temporary file path for uploading to Cloudinary
        const imageUploadResponse = await cloudinaryUploader(
            displayPicture.tempFilePath, // File is in tempFilePath
            process.env.CLOUDINARY_FOLDER_NAME, // Folder name in Cloudinary
            1000, // Height
            80 // Quality
        );

        // Update the user's image URL in the database
        user.image = imageUploadResponse.secure_url;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Display picture updated successfully.",
        });
    } catch (error) {
        console.error("Error in updateDisplayPicture:", error);
        return res.status(500).json({
            success: false,
            message:
                "Unable to update display picture. Please try again later.",
        });
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).populate("courses");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Enrolled courses fetched successfully.",
            courses: user.courses,
        });
    } catch (error) {
        console.error("Error in getEnrolledCourses:", error);
        return res.status(500).json({
            success: false,
            message:
                "Unable to fetch enrolled courses. Please try again later.",
        });
    }
};
