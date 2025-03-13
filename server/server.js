import checkConnectionRoute from "./src/routes/CheckConnectionRoute.js";
import cloudinaryConnector from "./src/config/cloudinaryConnector.js"; // Cloudinary setup function
import cookieParser from "cookie-parser"; // Middleware for handling cookies
import cors from "cors"; // Middleware to handle Cross-Origin Resource Sharing (CORS)
import courseRoutes from "./src/routes/CourseRoutes.js";
// Import configuration files (Database & Cloudinary)
import databaseConnector from "./src/config/databaseConnector.js"; // Database connection function
import dotenv from "dotenv"; // Load environment variables from .env file
// Import required modules
import express from "express"; // Express framework for server creation
import fileupload from "express-fileupload"; // Middleware for handling file uploads
import paymentRoutes from "./src/routes/PaymentRoutes.js";
// Import routes
import profileRoutes from "./src/routes/ProfileRoutes.js";
import userRoutes from "./src/routes/UserRoutes.js";
// Load environment variables
dotenv.config();

// Create an Express application
const app = express();
const PORT = process.env.PORT || 4000; // Default port 4000 if PORT is not specified in .env

// Middleware configuration
app.use(express.json()); // Enable JSON parsing in requests
app.use(cookieParser()); // Enable handling of cookies

// CORS setup - Allows frontend requests from http://localhost:3000
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

// File upload configuration
app.use(
    fileupload({
        useTempFiles: true, // Enables temporary file storage
        tempFileDir: "./tempFileDirectory", // Temporary file storage directory
    })
);

// Establish connections to database and cloud storage
databaseConnector();
cloudinaryConnector();

// Register API routes
app.use("/api/v1/profile", profileRoutes); // Routes for user profile operations
app.use("/api/v1/courses", courseRoutes); // Routes for course-related operations
app.use("/api/v1/payments", paymentRoutes); // Routes for payment-related operations
app.use("/api/v1/auth", userRoutes); // Routes for authentication (signup, login, etc.)
app.use("/api/v1/check", checkConnectionRoute); // Routes for payment-related operations

// Default route - Health check
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Server is up and running!",
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server started successfully on port ${PORT}`);
});
