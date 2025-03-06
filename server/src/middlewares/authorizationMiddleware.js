import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Middleware for token authorization
export const auth = async (req, res, next) => {
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

            // Store decoded user data in req.user for access in other middleware
            req.user = decodedToken;

            // Passing control to the next middleware or route handler.
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Access denied. Invalid or expired token.",
                error: error.message,
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while validating the token.",
            error: error.message,
        });
    }
};

// Middleware to restrict access to students
export const isStudent = (req, res, next) => {
    if (req.user.accountType !== "student") {
        return res.status(403).json({
            success: false,
            message: "Access restricted to students only.",
        });
    }
    next();
};

// Middleware to restrict access to admins
export const isAdmin = (req, res, next) => {
    if (req.user.accountType !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Access restricted to admins only.",
        });
    }
    next();
};

// Middleware to restrict access to instructors
export const isInstructor = (req, res, next) => {
    if (req.user.accountType !== "instructor") {
        return res.status(403).json({
            success: false,
            message: "Access restricted to instructors only.",
        });
    }
    next();
};
