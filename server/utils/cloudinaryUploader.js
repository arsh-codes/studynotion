const cloudinary = require("cloudinary").v2;

// Function to upload a file to Cloudinary with customizable options
exports.uploadToCloudinary = async (file, folder, height, quality) => {
    try {
        // Initialize the options object with the provided folder
        const options = {
            folder,
            resource_type: "auto", // Automatically determine resource type (image, video, etc.)
        };

        // Add height and quality to options if provided, ensuring that they are numbers
        if (height && !isNaN(height)) options.height = height;
        if (quality && !isNaN(quality)) options.quality = quality;

        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(file, options);
        
        // Return the upload result (contains URL, public_id, etc.)
        return result;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error.message); // Log the error message for clarity
        throw new Error("File upload failed: " + error.message); // Pass the error message to the thrown error
    }
};
