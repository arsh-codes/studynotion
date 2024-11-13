const User = require("../models/User");
const bcrypt = require("bcrypt");
const mailSender = require("../utils/mailSender");
const jwt = require("jsonwebtoken");

//if user remembers last password
exports.changePassword = async (req, res) => {
    try {
        // Extract data from the request body
        const { oldPassword, newPassword, confirmPassword, email } = req.body;

        // Check for missing fields
        if (!oldPassword || !newPassword || !confirmPassword || !email) {
            return res.status(400).json({
                success: false,
                message:
                    "All fields (oldPassword, newPassword, confirmPassword, email) are required.",
            });
        }

        // Check if new password matches confirmation
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "New password and confirmation password do not match.",
            });
        }

        // Find the user by email
        const user = await User.findOne({ email });
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
            email,
            "Password Changed Successfully",
            `<p>Your password has been successfully changed.</p>`
        );

        // Send a success response
        return res.status(200).json({
            success: true,
            message: "Password has been updated successfully.",
        });
    } catch (error) {
        // Handle errors
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the password.",
            error,
        });
    }
};

exports.resetPasswordMailSender = async (req, res) => {
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

        // Generate reset password token
        const token = crypto.randomUUID();
        await User.findOneAndUpdate(
            { email },
            {
                token: token,
                resetPasswordTokenExpires: Date.now() + 5 * 60 * 1000,
            },
            { new: true }
        );

        const resetPasswordUrl = `http://localhost:3000/reset-password/${token}`;

        // Send reset password email
        const emailSent = await mailSender(
            email,
            "Password Reset Link",
            `Follow this link to reset your password: ${resetPasswordUrl}`
        );

        if (!emailSent) {
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
        });
    } catch (error) {
        // Handle any other errors
        return res.status(500).json({
            success: false,
            message:
                "An unexpected error occurred while processing the password reset request",
            error,
        });
    }
};
const bcrypt = require("bcryptjs"); // Ensure bcrypt is properly imported
const User = require("../models/User"); // Adjust based on your file structure

exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword, confirmPassword } = req.body;

        // Check if newPassword and confirmPassword match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match. Please try again.",
            });
        }

        // Find user by token
        const user = await User.findOne({ resetPasswordToken: token });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid token. Please request a new password reset.",
            });
        }

        // Check if the reset password token has expired
        if (user.resetPasswordTokenExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message:
                    "Token has expired. Please request a new password reset.",
            });
        }

        // Hash the new password before saving it
        const hashedPassword = await bcrypt.hash(newPassword, 10); // Ensure bcrypt.hash is awaited

        // Update the user's password
        user.password = hashedPassword;
        // Clear the reset token after successful password reset
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
        console.error(error); // Log the error for debugging
        return res.status(500).json({
            success: false,
            message:
                "An unexpected error occurred while processing the password reset request.",
            error: error.message, // Include error details for debugging
        });
    }
};
