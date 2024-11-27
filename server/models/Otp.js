const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailVerificationOtpTemplate = require("../mail/templates/emailVerificationOtpTemplate");

// Define the OTP schema with fields for email, OTP, and timestamp
const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true, 
    },
    createdAt: {
        type: Date,
        default: Date.now, 
        required: true, 
        expires: 5 * 60,  // Document will automatically expire 5 minutes after creation
    },
});

// Function to send the verification email
const sendVerificationEmail = async (email, otp) => {
    try {
        // Send email with the OTP using the mailSender utility
        const info = await mailSender(
            email,                      // The recipient's email
            "Email Verification",       // Subject of the email
            emailVerificationOtpTemplate(otp)  // Email body template with the OTP
        );
        console.log("Verification email sent:", info); 
        return info;
    } catch (error) {
        // Log detailed error information for debugging
        console.error("Error occurred while sending verification mail:", error);
        throw new Error("Failed to send verification email.");
    }
};

// Pre-save middleware for OTP document to send email before saving the OTP
otpSchema.pre("save", async function (next) {
    try {
        // Send the OTP verification email before saving the OTP document
        await sendVerificationEmail(this.email, this.otp);
        next();  // Proceed with the save operation if email was sent successfully
    } catch (error) {
        next(error);  // Pass error to the next middleware to handle it if email fails
    }
});

// Create and export the OTP model using the schema
module.exports = mongoose.model("Otp", otpSchema);
