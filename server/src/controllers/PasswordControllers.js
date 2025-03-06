// This file includes the following controllers:
// 1. resetPasswordTokenMail
// 2. resetPassword
// 3. changePassword

import User from "../models/User.js";
// Import necessary modules using ESM
import bcrypt from "bcrypt";
import crypto from "crypto"; // For generating secure reset tokens
import dotenv from "dotenv"; // Load environment variables
import mailSender from "../utils/mailSender.js";
import passwordResetLinkTemplate from "../mail/templates/passwordResetLinkTemplate.js";
import passwordUpdatedTemplate from "../mail/templates/passwordUpdatedTemplate.js";

dotenv.config(); // Initialize environment variables

// Function to send password reset link to the user's email
export const resetPasswordTokenMail = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate input
        if (!email) {
            return res
                .status(400)
                .json({ success: false, message: "Email is required." });
        }

        // Check if user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No account found with this email.",
            });
        }

        // Generate a unique reset token with an expiration time
        const resetPasswordToken = crypto.randomUUID();
        const resetPasswordTokenExpires = Date.now() + 15 * 60 * 1000; // Token valid for 15 minutes

        // Save the token to the user document
        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordTokenExpires = resetPasswordTokenExpires;
        await user.save();

        // Construct password reset URL
        const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetPasswordToken}`;

        // Send the password reset link via email
        const mailResponse = await mailSender(
            email,
            "Password Reset Link",
            passwordResetLinkTemplate(resetPasswordUrl)
        );

        if (!mailResponse) {
            return res.status(500).json({
                success: false,
                message: "Failed to send password reset email.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Password reset link sent successfully.",
        });
    } catch (error) {
        console.error("Error sending password reset link:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while processing your request.",
        });
    }
};

// Function to reset password using the reset token
export const resetPassword = async (req, res) => {
    try {
        const { resetPasswordToken, newPassword, confirmPassword } = req.body;

        // Validate passwords match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match. Please try again.",
            });
        }

        // Find user with the matching reset token
        const user = await User.findOne({ resetPasswordToken });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid or expired reset token.",
            });
        }

        // Check if the token has expired
        if (Date.now() > user.resetPasswordTokenExpires) {
            return res.status(400).json({
                success: false,
                message: "Token has expired. Please request a new reset link.",
            });
        }

        // Hash the new password and update user details
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpires = undefined;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successful.",
        });
    } catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while resetting your password.",
        });
    }
};

// Function to allow an authenticated user to change their password
export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const userId = req.user.id;

        // Ensure all required fields are provided
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        // Validate new passwords match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "New passwords do not match.",
            });
        }

        // Fetch user from the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Verify old password before allowing the change
        const isPasswordCorrect = await bcrypt.compare(
            oldPassword,
            user.password
        );
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Incorrect old password.",
            });
        }

        // Hash the new password and update the user document
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        // Send confirmation email about the password change
        await mailSender(
            user.email,
            "Your Password Was Changed",
            passwordUpdatedTemplate(user.email, user.firstName)
        );

        return res.status(200).json({
            success: true,
            message: "Password updated successfully.",
        });
    } catch (error) {
        console.error("Error changing password:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the password.",
        });
    }
};
