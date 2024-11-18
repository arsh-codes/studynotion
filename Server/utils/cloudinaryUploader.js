const cloudinary = require("cloudinary").v2;

// Function to upload an file to Cloudinary with customizable options
exports.uploadToCloudinary = async (file, folder, height, quality) => {
    try {
        // Set up the options object for Cloudinary upload
        const options = { folder };

        // Add height and quality to options if provided
        if (height) options.height = height;
        if (quality) options.quality = quality;

        // Set resource_type to 'auto' for automatic file handling
        options.resource_type = "auto";

        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(file, options);
        return result; // Return the upload result
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        throw new Error("File upload failed"); // Throw an error to handle in calling code
    }
};
