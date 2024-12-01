// This file contains the following controllers.
// capturePayment
// verifySignature

const { instance } = require("../utils/razorpay");
const mailsender = require("../utils/mailSender");
const Course = require("../models/Course");
const User = require("../models/User");
const courseEnrollmentTemplate = require("../mail/templates/courseEnrollmentTemplate");
const crypto = require("crypto"); // Ensure to import the crypto module
require("dotenv").config();

// Capture Payment and Create Razorpay Payment Link
exports.capturePayment = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required to proceed.",
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found. Please ensure you are logged in.",
            });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found. Please check the course ID.",
            });
        }

        if (course.studentsEnrolled.includes(userId)) {
            return res.status(409).json({
                success: false,
                message: "You are already enrolled in this course.",
            });
        }

        try {
            const paymentLinkOptions = {
                amount: course.price * 100, // Convert price to paisa (smallest unit)
                currency: "INR",
                notes: {
                    userName: `${user.firstName} ${user.lastName}`,
                    userEmail: user.email,
                    userId,
                    courseName: course.courseName,
                    courseId: course._id,
                },
            };

            const paymentResponse = await instance.paymentLink.create(
                paymentLinkOptions
            ); // Awaiting the Razorpay response
            return res.status(200).json({
                success: true,
                message: "Payment link created successfully.",
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                paymentResponse,
            });
        } catch (error) {
            console.error(
                `Error creating Razorpay payment link: ${error.message}`
            );
            return res.status(500).json({
                success: false,
                message:
                    "An error occurred while initiating the payment link. Please try again later.",
            });
        }
    } catch (error) {
        console.error(`Error in capturePayment: ${error.message}`);
        return res.status(500).json({
            success: false,
            message:
                "An unexpected error occurred while processing your payment. Please try again later.",
        });
    }
};

// Verify Razorpay Payment and Enroll User in Course
exports.verifySignature = async (req, res) => {
    try {
        const razorpaySignature = req.headers["x-razorpay-signature"];

        // Verify Razorpay signature using HMAC
        const hmac = crypto.createHmac(
            "sha256",
            process.env.WEBHOOK_SECRET_KEY
        );
        hmac.update(JSON.stringify(req.body));
        const digest = hmac.digest("hex");

        if (razorpaySignature !== digest) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature. Verification failed.",
            });
        }

        const { userId, courseId, userName, courseName, userEmail } =
            req.body.payload.payment.entity.notes;

        if (!userId || !courseId) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid payment details. Missing user or course information.",
            });
        }

        const course = await Course.findByIdAndUpdate(
            courseId,
            { $push: { studentsEnrolled: userId } },
            { new: true }
        );

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found. Enrollment failed.",
            });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { courses: courseId } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found. Enrollment failed.",
            });
        }

        // Send enrollment confirmation email
        const mailResponse = await mailsender(
            userEmail,
            "Course Registration Confirmation",
            courseEnrollmentTemplate(userName, courseName)
        );

        console.log("Mail sent successfully:", mailResponse);

        return res.status(200).json({
            success: true,
            message:
                "Payment verified and enrollment successful. Confirmation email sent.",
        });
    } catch (error) {
        console.error(`Error in verifyPayment: ${error.message}`);
        return res.status(500).json({
            success: false,
            message:
                "An unexpected error occurred during payment verification.",
        });
    }
};
