const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
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
        default: Date.now, // Set default to Date.now without calling it
        required: true,
        expires: 5 * 60, // Document expires 5 minutes after creation
    },
});

const sendVerificationEmail = async (email, otp) => {
    try {
        const title = "Email Verification";
        const body = `
            <h1>Email Verification</h1>
            <p>Please use the following OTP to verify your email:</p>
            <h2>${otp}</h2>
            <p>This OTP is valid for 5 minutes only.</p>
        `;

        const info = await mailSender(email, title, body);
        console.log("Verification email sent:", info);
        return info;
    } catch (error) {
        console.log("Error occurred while sending verification mail.");
        console.error(error);
        throw error; // Optionally throw the error to handle it at a higher level
    }
};

// Send verification email before saving the OTP
otpSchema.pre("save", async function (next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
});

module.exports = mongoose.model("Otp", otpSchema);
