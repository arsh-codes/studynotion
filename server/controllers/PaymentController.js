const { instance } = require("../utils/razorpay");
const mailsender = require("../utils/mailSender");
const Course = require("../models/Course");
const User = require("../models/User");
const courseEnrollmentEmail = require("../mail/templates/courseEnrollmentTemplate");
require("dotenv").config();
exports.capturePayment = async (req, res) => {
    try {
        // Extract course ID and user ID
        const { courseId } = req.body;
        const userId = req.user.id;

        // Validate if courseId is provided
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required to proceed.",
            });
        }

        // Fetch user details
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found. Please ensure you are logged in.",
            });
        }

        // Fetch course details
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found. Please check the course ID.",
            });
        }

        // Check if the user is already enrolled in the course
        if (course.studentsEnrolled.includes(userId)) {
            return res.status(409).json({
                success: false,
                message: "You are already enrolled in this course.",
            });
        }

        // Create Razorpay payment link
        try {
            const paymentLinkOptions = {
                amount: course.price * 100, // Convert course price to the smallest currency unit (paisa in this case)
                currency: "INR",
                notes: {
                    userName: `${user.firstName} ${user.lastName}`,
                    userEmail: user.email,
                    userId,
                    courseName: course.courseName,
                    courseId: course._id,
                },
            };

            const paymentResponse =
                instance.paymentLink.create(paymentLinkOptions);

            // Return success response with payment link details
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
exports.verifyPayment = async (req, res) => {
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

        // Extract payment details from Razorpay payload
        const { userId, courseId, userName, courseName, userEmail } =
            req.body.payload.payment.entity.notes;

        if (!userId || !courseId) {
            // Validate necessary fields
            return res.status(400).json({
                success: false,
                message:
                    "Invalid payment details. Missing user or course information.",
            });
        }

        // Update course and user data
        const course = await Course.findByIdAndUpdate(
            courseId, // FIXED: Corrected query format
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
            userId, // FIXED: Corrected query format
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
