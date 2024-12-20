const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const databaseConnector = require("../server/config/databaseConnector.js");
const cloudinaryConnector = require("../server/config/cloudinaryConnector.js");
const cors = require("cors");
const fileupload = require("express-fileupload");

// ROUTES
const profileRoutes = require("../server/routes/ProfileRoutes.js");
const courseRoutes = require("../server/routes/CourseRoutes.js");
const paymentRoutes = require("../server/routes/PaymentRoutes.js");
const userRoutes = require("./routes/UserRoutes.js");

// Load environment variables from a .env file into process.env
dotenv.config(); // Ensures sensitive data like database credentials are securely loaded from the .env file

// Create an instance of Express application
const app = express(); // Main application instance for handling routes and middleware

// Set up the port to listen on (default to 4000 if not set in .env)
const PORT = process.env.PORT || 4000; // Ensures flexibility in setting the port

// Middleware setup
app.use(express.json()); // Parses incoming JSON payloads
app.use(cookieParser()); // Parses cookies sent with requests
app.use(
    cors({
        origin: "http://localhost:3000", // Allow requests from this origin (frontend app)
        credentials: true, // Enable credentials (cookies, authorization headers)
    })
); // Added CORS middleware to handle cross-origin requests

app.use(
    fileupload({
        useTempFiles: true, // Use temporary files for uploads
        tempFileDir: "./tempFileDirectory", // Temporary directory for storing uploaded files
    })
); // Added middleware to handle file uploads

// Connect to the database
databaseConnector(); // Establishes connection to the database
cloudinaryConnector();
// Set up application routes
app.use("/api/v1/profile", profileRoutes); // Profile-related routes
app.use("/api/v1/courses", courseRoutes); // Course-related routes
app.use("/api/v1/payments", paymentRoutes); // Payment-related routes
app.use("/api/v1/auth", userRoutes); // Authentication routes

// Default route to check server status
app.get("/", (req, res) => {
    // FIXED: Corrected parameter order (req, res)
    return res.json({
        success: true,
        message: "Server is up and running!", // Added a default success message
    });
});
// Start the server and log the success message
app.listen(PORT, () => {
    console.log(`Server started successfully on port ${PORT}`); // Logs server start message
});
