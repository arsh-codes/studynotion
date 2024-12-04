// This file includes the following controllers:
//
// 1. sendOtp - Handles sending OTP for email verification.
// 2. signup  - Manages user registration process.
// 3. login   - Manages user authentication and login.

//External Dependencies
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
require("dotenv").config(); // Load environment variables
//Internal Modules
const User = require("../models/User");
const Otp = require("../models/Otp");
const Profile = require("../models/Profile");

// Send OTP For Email Verification
exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if email is provided
        if (!email) {
            return res.status(400).json({
                success: false,
                message:
                    "Email address is missing. Please provide a valid email address to proceed.",
            });
        }

        // Check if user is already present
        // Find user with provided email
        const checkUserPresent = await User.findOne({ email });

        // If user found with provided email,return user already exists.
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: `User is Already Registered. Please Login.`,
            });
        }
        //Creating an OTP of 6 digits and numerical value.
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        // Check if the generated OTP already exists in the database
        const existingOtp = await Otp.findOne({ otp });

        // Regenerate OTP until a unique one is found
        while (existingOtp) {
            console.log(
                "OTP already existing in Database, creating a new one. Old OTP:",
                existingOtp
            );
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            existingOtp = await Otp.findOne({ otp }); // Re-check for uniqueness
        }

        // Store the generated OTP in the database along with the associated email address which expires in 5 minutes after creation).
        // Additionally, a pre-save middleware is defined in the model that triggers the sending of the verification email before the OTP is saved to the database.
        const newOtpEntry = await Otp.create({ email, otp });
        console.log("OTP object in DB:", newOtpEntry);

        res.status(200).json({
            success: true,
            message: `OTP Sent Successfully`,
            otp,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
};

// Signup Controller for Registering Users
exports.signup = async (req, res) => {
    try {
        // Destructure fields from the request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;
        // Check if All Details are there or not
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword ||
            !otp
        ) {
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            });
        }
        // Check if password and confirm password match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message:
                    "Password and Confirm Password do not match. Please try again.",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please logIn to continue.",
            });
        }

        // Query the database to find OTP entries associated with the provided email
        const response = await Otp.find({ email })
            // Sort the OTP records by their creation date in descending order (most recent first)
            .sort({ createdAt: -1 })
            // Limit the query to only return the most recent OTP record (1 record)
            .limit(1);

        // Log the result of the query to the console
        console.log("Latest OTP in database: ", response);

        //    If no matching records are found, response will be an empty array.
        if (response.length === 0) {
            // OTP not found for the email
            return res.status(400).json({
                success: false,
                message:
                    "No OTP found for the provided email address. Please request a new OTP.",
            });
        }
        // response will contain most recent OTP entry for the provided email at [0].
        if (otp !== response[0].otp) {
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "The OTP entered is incorrect. Please try again.",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the Dummy Profile For User which will be modified later using update profile
        const dummyProfile = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            additionalDetails: dummyProfile._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`,
        });

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
        });
    }
};

// Login controller for authenticating users
exports.login = async (req, res) => {
    try {
        // Get email and password from request body
        const { email, password } = req.body;

        // Check if email or password is missing
        if (!email || !password) {
            // Return 400 Bad Request status code with error message
            return res.status(400).json({
                success: false,
                message: `Please Fill up All the Required Fields`,
            });
        }

        // Find user with provided email
        const user = await User.findOne({ email })
            .populate("additionalDetails")
            .populate(courses);

        // If user not found with provided email
        if (!user) {
            // Return 401 Unauthorized status code with error message
            return res.status(401).json({
                success: false,
                message: `User is not Registered with us. Please SignUp to Continue`,
            });
        }

        // Verify Password
        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                success: false,
                message: `Password is incorrect`,
            });
        }
        // Generate JWT token
        const token = jwt.sign(
            {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "24h",
            }
        );

        // Save token to user document in database
        user.token = token;

        // Save the user document to the database, storing the token
        await user.save();

        user.password = undefined; // Set the password field to undefined to ensure that the password is not returned in the response

        // Set cookie for token and return success response
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Set the cookie expiration time to 3 days
            httpOnly: true, // Set the cookie to be accessible only through HTTP requests, preventing client-side JavaScript access for security
        };

        // Set the JWT token as an HTTP-only cookie
        res.cookie("token", token, options) // Set the 'token' named cookie with the generated JWT token and options
            .status(200)
            .json({
                success: true,
                token,
                user, // user object (without the password)
                message: `User Login Success`,
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: `Login Failure Please Try Again`,
        });
    }
};
