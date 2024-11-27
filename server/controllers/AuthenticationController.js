const AdditionalDetails = require("../models/AdditionalDetails");
const User = require("../models/User");
const Course = require("../models/Course");

// Update user profile details
exports.updateProfile = async (req, res) => {
    try {
        const { gender, dateOfBirth, about, contactNumber } = req.body;
        const userId = req.user.id; // Assuming userId is added by login middleware

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

        // Get the additionalDetails ID from the user's additionalDetails field
        const additionalDetailsId = user.additionalDetails;
        if (!additionalDetailsId) {
            return res.status(404).json({
                success: false,
                message: "Profile details are not associated with this user.",
            });
        }

        // Find the additionalDetails by ID
        const additionalDetails = await AdditionalDetails.findById(additionalDetailsId);
        if (!additionalDetails) {
            return res.status(404).json({
                success: false,
                message: "Profile details could not be found.",
            });
        }

        // Update the additional details fields
        additionalDetails.contactNumber = contactNumber;
        additionalDetails.gender = gender;
        if (dateOfBirth) additionalDetails.dateOfBirth = dateOfBirth;
        if (about) additionalDetails.about = about;

        // Save the updated details
        const updatedAdditionalDetails = await additionalDetails.save();

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "Your profile has been updated successfully.",
            additionalDetails: updatedAdditionalDetails,
        });
    } catch (error) {
        console.error(`Error updating profile for user ${req.user.id}:`, error);
        return res.status(500).json({
            success: false,
            message: "We encountered an issue while updating your profile. Please try again later.",
            error: error.message,
        });
    }
};

// Delete user account along with associated data
exports.deleteAccount = async (req, res) => {
    try {
        // Extract user ID from the authenticated request 
        const userId = req.user.id;

        // Find the user in the database
        const user = await User.findById(userId);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "The requested user account was not found.",
            });
        }

        // Delete the user from the associated courses
        if (Array.isArray(user.courses) && user.courses.length > 0) {
            // Loop through the courses and remove the user from each course's "userId" field
            for (let courseId of user.courses) {
                await Course.findByIdAndUpdate(courseId, {
                    $pull: { users: userId },  // Assuming "users" is the field storing user references in the course model
                });
            }
        }

        // Get associated additional details ID
        const additionalDetailsId = user.additionalDetails;

        // Delete additional details if they exist
        if (additionalDetailsId) {
            await AdditionalDetails.findByIdAndDelete(additionalDetailsId);
        }

        // Delete the user account
        await User.findByIdAndDelete(userId);

        // Return success response
        return res.status(200).json({
            success: true,
            message: "Your account has been deleted successfully. We hope to see you again!",
        });
    } catch (error) {
        console.error("Error deleting account for user:", req.user.id, error);
        return res.status(500).json({
            success: false,
            message: "We encountered an error while trying to delete your account. Please try again later.",
            error: error.message,
        });
    }
};
