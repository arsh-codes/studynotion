const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware for token authorization
exports.auth = async (req, res, next) => {
    try {
        // Retrieve the token from request body, cookies, or Authorization header
        const token =
            req.body.token ||
            req.cookies.token ||
            req.header("Authorization")?.replace("Bearer ", "");

        // Check if a token is provided
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. Token not found.",
            });
        }

        // Verify and decode the token
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            console.log(
                "📝 -> exports.authorization= -> decodedToken=",
                decodedToken
            );

            // Attach the decoded token's data to the request object
            req.user = decodedToken;

            // Proceed to the next middleware
            next();
        } catch (error) {
            // Handle invalid or expired token error
            return res.status(401).json({
                success: false,
                message: "Access denied. Invalid or expired token.",
                error: error.message,
            });
        }
    } catch (error) {
        // Handle unexpected errors during the token validation process
        return res.status(500).json({
            success: false,
            message: "An error occurred while validating the token.",
            error: error.message,
        });
    }
};

// Middleware to restrict access to students
exports.isStudent = (req, res, next) => {
    if (req.user.accountType !== "student") {
        return res.status(403).json({
            success: false,
            message: "Access restricted to students only.",
        });
    }
    next();
};

// Middleware to restrict access to admins
exports.isAdmin = (req, res, next) => {
    if (req.user.accountType !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access restricted to admins only.",
        });
    }
    next();
};

// Middleware to restrict access to instructors
exports.isInstructor = (req, res, next) => {
    if (req.user.accountType !== "instructor") {
        return res.status(403).json({
            success: false,
            message: "Access restricted to instructors only.",
        });
    }
    next();
};
