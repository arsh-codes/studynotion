const User = require("../models/User");
const Otp = require("../models/Otp");
const otpGenerator = require("otp-generator");

exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the user already exists
        const checkUserPresent = await User.findOne({ email });
        if (checkUserPresent) {
            return res.status(401).json({ success: false, message: "User already exists." });
        }

        // Generate a 6-digit OTP (numbers only)
        let generatedOtp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        // Check if OTP already exists in the database and regenerate if needed
        let otpSearchResult = await Otp.findOne({ otp: generatedOtp });
        while (otpSearchResult) {
            generatedOtp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            otpSearchResult = await Otp.findOne({ otp: generatedOtp });
        }

        console.log("Generated OTP:", generatedOtp);

        // Create an OTP entry in the database with email and generated OTP
        const otpEntry = new Otp({
            email,
            otp: generatedOtp,
        });

        await otpEntry.save();
        console.log("OTP Entry Created:", otpEntry);

        // Here you would typically send the OTP to the user's email or phone
        // For example, using a mail service (Nodemailer) or SMS gateway.

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully.",
        });
    } catch (error) {
        console.error("Error while creating OTP:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while generating the OTP. Please try again later.",
        });
    }
};
