const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const AdditionalDetails = require("../models/AdditionalDetails");
const Otp = require("../models/Otp");
require("dotenv").config();

exports.signUp = async (req, res) => {
    try {
        // Extract fields from the request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp,
        } = req.body;

        // Check for missing required fields
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword ||
            !accountType ||
            !otp
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Required fields are missing. Please complete all fields and try again.",
            });
        }

        // Ensure passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords don't match.",
            });
        }

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "An account with this email address already exists.",
            });
        }

        // Retrieve the latest OTP entry from the database
        const latestOtpInDb = await Otp.find({ email })
            .sort({ createdAt: -1 })
            .limit(1);

        // Validate OTP
        if (!latestOtpInDb || latestOtpInDb.length === 0) {
            return res.status(400).json({
                success: false,
                message:
                    "No OTP found for the provided email address. Please check and try again.",
            });
        } else if (otp !== latestOtpInDb[0].otp) {
            return res.status(400).json({
                success: false,
                message:
                    "The provided OTP does not match. Please verify and try again.",
            });
        }

        // Hash the user's password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create an associated additionalDetails for the user
        const additionalDetails = await additionalDetails.create({
            gender: null,
            dateOfBirth: null,
            contactNumber: null,
            about: null,
        });

        // Create a new user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            additionalDetails: additionalDetails._id,
            image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        // Send a success response
        return res.status(200).json({
            success: true,
            message: "Registration successful. Your account has been created.",
            user,
        });
    } catch (error) {
        // Send an error response if an exception occurs
        res.status(500).json({
            success: false,
            message:
                "An error occurred during registration. Please try again later.",
            error,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate that both fields are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Both email and password are required for login.",
            });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message:
                    "No account found with this email. Please register to create an account.",
            });
        }

        // Verify the password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "The password entered is incorrect. Please try again.",
            });
        }

        // Create the JWT payload
        const payloadForJwt = {
            email: user.email,
            id: user._id,
            accountType: user.accountType,
        };

        // Generate the token
        const token = jwt.sign(payloadForJwt, process.env.JWT_SECRET_KEY, {
            expiresIn: "2h",
        });

        // Assign the token to the user object temporarily
        user.token = token;
        user.password = undefined; // Remove password from response for security

        // Set cookie options and send response
        const cookieOptions = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days expiration
            httpOnly: true,
        };
        res.cookie("token", token, cookieOptions).status(200).json({
            success: true,
            message: "Login successful. Welcome back!",
            token,
            user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred during login. Please try again later.",
            error,
        });
    }
};
