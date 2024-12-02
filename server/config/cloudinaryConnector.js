const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnector = () => {
    try {
        // Configure Cloudinary with environment variables
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        // Log success message
        console.log("Cloudinary configured successfully");
    } catch (error) {
        // Log error to the console with a clear description
        console.error(`Error configuring Cloudinary: ${error.message}`);

        // Return a descriptive error message for debugging
        throw new Error(
            "Failed to configure Cloudinary. Please verify environment variables."
        );
    }
};
