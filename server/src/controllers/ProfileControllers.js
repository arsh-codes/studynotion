// This file includes the following controllers:
// 1. updateProfile
// 2. deleteAccount
// 3. getUserDetails
// 4. updateDisplayPicture
// 5. getEnrolledCourses

import Course from "../models/Course.js";
// Import necessary modules and models using ESM syntax
import Profile from "../models/Profile.js";
import User from "../models/User.js";
import cloudinaryUploader from "../utils/cloudinaryUploader.js";
import fs from "fs";

// Update user profile details
export const updateProfile = async (req, res) => {
    try {
        const { gender, dateOfBirth, about, contactNumber } = req.body;
        const userId = req.user.id; // Extract user ID from authentication middleware

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

        // Find and update additional profile details
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
            profile: updatedDetails,
        });
    } catch (error) {
        console.error(`Error in updateProfile: ${error.message}`);
        return res.status(500).json({
            success: false,
            message:
                "An error occurred while updating your profile. Please try again later.",
        });
    }
};

// Delete user account and associated details
export const deleteAccount = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "The requested user account was not found.",
            });
        }

        // Remove user from all enrolled courses
        if (Array.isArray(user.courses) && user.courses.length > 0) {
            for (const courseId of user.courses) {
                await Course.findByIdAndUpdate(courseId, {
                    $pull: { studentsEnrolled: userId },
                });
            }
        }

        // Delete associated profile details
        if (user.additionalDetails) {
            await Profile.findByIdAndDelete(user.additionalDetails);
        }

        // Delete user account
        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success: true,
            message: "Your account has been deleted successfully.",
        });
    } catch (error) {
        console.error(`Error in deleteAccount: ${error.message}`);
        return res.status(500).json({
            success: false,
            message:
                "An error occurred while deleting your account. Please try again later.",
        });
    }
};

// Fetch user details, including enrolled courses and progress
export const getUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;

        // Retrieve user details and populate references
        const user = await User.findById(userId)
            .populate("additionalDetails")
            .populate("courses")
            .populate("courseProgress");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        user.password = undefined; // Omit password for security

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

// Update user display picture
export const updateDisplayPicture = async (req, res) => {
    try {
        if (!req.files || !req.files.displayPicture) {
            return res.status(400).json({
                success: false,
                message: "Display picture is required.",
            });
        }
        const userId = req.user.id;
        const { displayPicture } = req.files;

        // Validate file type
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedMimeTypes.includes(displayPicture.mimetype)) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid file type. Only JPG, JPEG, and PNG are allowed.",
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Upload image to Cloudinary
        const imageUploadResponse = await cloudinaryUploader(
            displayPicture.tempFilePath,
            process.env.CLOUDINARY_FOLDER_NAME,
            1000,
            80
        );

        user.image = imageUploadResponse.secure_url;
        console.log("📝 -> updateDisplayPicture -> user.image=", user.image);

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Display picture updated successfully.",
            updatedUser: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
            },
        });
    } catch (error) {
        console.error("Error in updateDisplayPicture:", error);
        return res.status(500).json({
            success: false,
            message:
                "Unable to update display picture. Please try again later.",
            err: ("somthing", error.message),
            err2: error,
        });
    }
    console.log("📝 -> updateDisplayPicture -> tempFilePath=", tempFilePath);
};

// Get all courses a user is enrolled in
export const getEnrolledCourses = async (req, res) => {
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
