const cloudinary = require("cloudinary").v2;
const fs = require("fs"); // File System module for handling files

// Function to upload a file to Cloudinary with customizable options
const cloudinaryUploader = async (file, folderName, height, quality) => {
    try {
        // Initialize the options object with the provided folder
        const options = {
            folder: folderName,
            resource_type: "auto", // Automatically determine resource type (image, video, etc.)
        };

        // Add height and quality to options if provided, ensuring that they are numbers
        if (height && !isNaN(height)) options.height = height;
        if (quality && !isNaN(quality)) options.quality = quality;

        // Upload the file to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(file, options);

        // Delete the temp file after upload
        await fs.promises.unlink(file);

        // Return the upload result (contains URL, public_id, etc.)
        return uploadResponse;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error.message);
        throw new Error(
            "File upload failed: Please check the file and try again."
        );
    }
};

module.exports = cloudinaryUploader;
