const AdditionalDetails = require("../models/AdditionalDetails");
const User = require("../models/User");
const Course = require("../models/Course");
// This file contains the following controllers.
// deleteProfile
// updateProfile
// getAllUserDetails
// updateDisplayPicture
// getEnrolledCourses
 

 
exports.updateProfile = async (req, res) => {
    try {
        const { gender, dateOfBirth, about, contactNumber } = req.body;
        const userId = req.user.id; // Assuming userId is added by authentication middleware

        // Validate required inputs
        if (!userId || !gender || !contactNumber) {
            return res.status(400).json({
                success: false,
                message: "Gender and contact number are required to update your profile.",
            });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No user found with the given ID.",
            });
        }

        // Find and update additional details
        const additionalDetails = await AdditionalDetails.findById(user.additionalDetails);
        if (!additionalDetails) {
            return res.status(404).json({
                success: false,
                message: "Profile details could not be found.",
            });
        }

        additionalDetails.contactNumber = contactNumber;
        additionalDetails.gender = gender;
        if (dateOfBirth) additionalDetails.dateOfBirth = dateOfBirth;
        if (about) additionalDetails.about = about;

        const updatedDetails = await additionalDetails.save();

        return res.status(200).json({
            success: true,
            message: "Your profile has been updated successfully.",
            additionalDetails: updatedDetails,
        });
    } catch (error) {
        console.error(`Error updating profile for user ${req.user.id}:`, error);
        return res.status(500).json({
            success: false,
            message: "We encountered an issue while updating your profile. Please try again later.",
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
        if (Array.isArray(user.courses)) {
            for (const courseId of user.courses) {
                await Course.findByIdAndUpdate(courseId, { $pull: { userId } });
            }
        }

        // Delete associated additional details
        if (user.additionalDetails) {
            await AdditionalDetails.findByIdAndDelete(user.additionalDetails);
        }

        // Delete user account
        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            success: true,
            message: "Your account has been deleted successfully. We hope to see you again!",
        });
    } catch (error) {
        console.error(`Error deleting account for user ${req.user.id}:`, error);
        return res.status(500).json({
            success: false,
            message: "We encountered an error while trying to delete your account. Please try again later.",
        });
    }
};

 
exports.getAllUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).populate("additionalDetails");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User details fetched successfully.",
            user,
        });
    } catch (error) {
        console.error(`Error fetching details for user ${req.user.id}:`, error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch user details. Please try again later.",
        });
    }
};

 
exports.updateDisplayPicture = async (req, res) => {
    try {
        const { displayPicture } = req.body;
        const userId = req.user.id;

        if (!displayPicture) {
            return res.status(400).json({
                success: false,
                message: "Display picture URL is required.",
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        user.displayPicture = displayPicture;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Display picture updated successfully.",
        });
    } catch (error) {
        console.error(`Error updating display picture for user ${req.user.id}:`, error);
        return res.status(500).json({
            success: false,
            message: "Unable to update display picture. Please try again later.",
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
        console.error(`Error fetching courses for user ${req.user.id}:`, error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch enrolled courses. Please try again later.",
        });
    }
};
