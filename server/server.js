// server.js

// Import required modules
const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const dbConnector = require("./config/dbConnector"); // Import the DB connector
const authRoutes = require("./routes/authRoutes"); // Import authentication routes

// Load environment variables from a .env file into process.env
dotenv.config();

// Create an instance of Express application
const app = express();

// Set up the port to listen on (default to 3000 if not set in .env)
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser()); // Parse cookies from incoming requests

// Connect to the database
dbConnector();

// Set up routes for authentication
app.use("/api/v1", authRoutes);

// Start the server and log the success message
app.listen(PORT, () => {
  console.log(`Server 'app' started at port ${PORT}`);
});
