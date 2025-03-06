// Load environment variables from the .env file
import dotenv from "dotenv";
// Import the mongoose library for MongoDB object modeling
import mongoose from "mongoose";

dotenv.config();

// Retrieve the MongoDB connection URL from environment variables
const URL = process.env.MONGO_DATABASE_URL;

if (!URL) {
    throw new Error(
        "Database connection URL is missing. Please check your environment variables."
    );
}

// Define an asynchronous function to connect to the MongoDB database
const databaseConnector = async () => {
    try {
        // Attempt to connect to the MongoDB database with additional options for compatibility
        await mongoose.connect(URL, {
            dbName: "studynotion",
        });

        // Log success message upon successful connection
        console.log("✅ Connected to the database successfully.");
    } catch (error) {
        // Log detailed error information for debugging
        console.error(`❌ Error connecting to the database: ${error.message}`);

        // Exit the process with a failure code to prevent further execution
        process.exit(1);
    }
};

// Export the databaseConnector function for use in other modules
export default databaseConnector;
