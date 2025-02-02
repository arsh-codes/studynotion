import express, { Request, Response } from "express"; // Use TypeScript imports
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import databaseConnector from "./config/databaseConnector.js";
import cloudinaryConnector from "./config/cloudinaryConnector.js";
import cors from "cors";
import fileupload from "express-fileupload";

// ROUTES
import profileRoutes from "./routes/ProfileRoutes.js";
import courseRoutes from "./routes/CourseRoutes.js";
import paymentRoutes from "./routes/PaymentRoutes.js";
import userRoutes from "./routes/UserRoutes.js";

// Load environment variables from a .env file into process.env
dotenv.config();

// Create an instance of Express application
const app = express();

// Set up the port to listen on (default to 4000 if not set in .env)
const PORT = process.env.PORT || 4000;

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
databaseConnector();
cloudinaryConnector();

// Set up application routes
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/auth", userRoutes);

// // Default route to check server status
// app.get("/", (req: Request, res: Response) => {
//     return res.json({
//         success: true,
//         message: "Server is up and running!",
//     });
// });

// Start the server and log the success message
app.listen(PORT, () => {
    console.log(`Server started successfully on port ${PORT}`);
});
