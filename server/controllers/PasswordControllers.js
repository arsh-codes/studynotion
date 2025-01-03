// This file includes the following controllers:
//
// 1. resetPasswordTokenMail
// 2. resetPassword
// 3. changePassword

const bcrypt = require("bcrypt");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto"); // Import crypto module for generating reset tokens
const passwordResetLinkTemplate = require("../mail/templates/passwordResetLinkTemplate");
const passwordUpdatedTemplate = require("../mail/templates/passwordUpdatedTemplate")
// Function to send password reset link to the user's email
exports.resetPasswordTokenMail = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if email is provided
        if (!email) {
            return res
                .status(400)
                .json({ success: false, message: "Email is required" });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No account found with the provided email",
            });
        }

        // Generate a unique reset password token
        const resetPasswordToken = crypto.randomUUID();
        const resetPasswordTokenExpires = Date.now() + 15 * 60 * 1000; // Token expires in 15 minutes

        // Update the user with the reset password token and expiration time
        await User.findOneAndUpdate(
            { email },
            {
                resetPasswordToken,
                resetPasswordTokenExpires,
            } 
        );

        // Create the password reset URL
        const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetPasswordToken}`;

        // Send the password reset link to the user's email
        const mailSenderResponse = await mailSender(
            email,
            "Password Reset Link",
            passwordResetLinkTemplate(resetPasswordUrl)
        );

        if (!mailSenderResponse) {
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending the reset password URL",
            });
        }
        // Respond to the user
        return res.status(200).json({
            success: true,
            message:
                "Password reset link has been successfully sent to your email.",
                resetPasswordToken,
        });
    } catch (error) {
        console.error("Error while sending reset password link:", error);
        return res.status(500).json({
            success: false,
            message:
                "An unexpected error occurred while processing the password reset request",
            error: error.message,
        });
    }
};

// Function to reset the user's password using the reset token
exports.resetPassword = async (req, res) => {
    try {
        const { resetPasswordToken, newPassword, confirmPassword } = req.body;

        // Ensure passwords match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match. Please try again.",
            });
        }

        // Find user by reset token
        const user = await User.findOne({ resetPasswordToken });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid token. Please request a new password reset.",
            });
        }

        // Check if the reset token has expired
        if (user.resetPasswordTokenExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message:
                    "Token has expired. Please request a new password reset.",
            });
        }

        // Hash the new password before saving it
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;
        // Clear the reset token and expiration time after successful reset
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpires = undefined;

        // Save the updated user
        await user.save();

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "Password successfully reset.",
        });
    } catch (error) {
        console.error("Error while resetting password:", error);
        return res.status(500).json({
            success: false,
            message:
                "An unexpected error occurred while processing the password reset request.",
            error: error.message,
        });
    }
};

// Change password function (for users who remember their old password)
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const userId = req.user.id;
        // Check for missing fields
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message:
                    "All fields (oldPassword, newPassword, confirmPassword) are required.",
            });
        }

        // Ensure new password matches confirmation password
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirmation password do not match.",
            });
        }

        // Find the user by email
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }
        // Check if the old password matches the stored password
        const isOldPasswordCorrect = await bcrypt.compare(
            oldPassword,
            user.password
        );
        if (!isOldPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "The old password is incorrect.",
            });
        }
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        user.password = hashedPassword;
        await user.save();

        // Send a confirmation email
        await mailSender(
            user.email,
            "Security Alert: Your Password Was Changed ",
            passwordUpdatedTemplate(user.email, user.firstName)
        );

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "Password has been updated successfully.",
        });
    } catch (error) {
        console.error("Error while changing password:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the password.",
            error: error.message,
        });
    }
};
