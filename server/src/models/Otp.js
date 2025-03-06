import emailVerificationOtpTemplate from "../mail/templates/emailVerificationOtpTemplate.js";
import mailSender from "../utils/mailSender.js";
import mongoose from "mongoose";

// Define the schema for storing OTPs
const otpSchema = new mongoose.Schema(
    {
        // Email to which the OTP is linked
        email: {
            type: String,
            required: true,
        },

        // One-Time Password (OTP) for verification
        otp: {
            type: String,
            required: true,
        },

        // Timestamp when the OTP is created (automatically expires in 5 minutes)
        createdAt: {
            type: Date,
            default: Date.now,
            required: true,
            expires: 5 * 60, // The OTP document will automatically be deleted after 5 minutes
        },
    }
);

// Middleware to send email before saving the OTP document
otpSchema.pre("save", async function (next) {
    try {
        // Send the verification email
        await sendVerificationEmail(this.email, this.otp);
        next(); // Proceed with the save operation if email is sent successfully
    } catch (error) {
        next(error); // Pass the error to the next middleware if email sending fails
    }
});

// Function to send the verification email
const sendVerificationEmail = async (email, otp) => {
    try {
        // Send email using the mailSender utility
        const mailSenderResponse = await mailSender(
            email, // Recipient email
            "Your One-Time Password (OTP) for Email Verification", // Email subject
            emailVerificationOtpTemplate(otp) // Email body with OTP
        );
        return mailSenderResponse;
    } catch (error) {
        // Log error details for debugging
        console.error("Error occurred while sending verification mail:", error);
        throw new Error("Failed to send verification email.");
    }
};

// Create and export the OTP model using the schema
const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
