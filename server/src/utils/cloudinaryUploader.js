import cloudinary from "cloudinary";
import fs from "fs/promises"; // Use promises directly for cleaner async file handling

// Configure Cloudinary to use v2 API
const cloudinaryV2 = cloudinary.v2;

// Function to upload a file to Cloudinary with customizable options
const cloudinaryUploader = async (filePath, folderName, height, quality) => {
    try {
        // Validate file existence before upload
        await fs.access(filePath);

        // Set Cloudinary upload options
        const options = {
            folder: folderName,
            resource_type: "auto", // Automatically detects the file type
            ...(height && !isNaN(height) && { height }),
            ...(quality && !isNaN(quality) && { quality }),
        };

        // Upload the file to Cloudinary
        const uploadResponse = await cloudinaryV2.uploader.upload(filePath, options);

        // Delete the temporary file after upload
        await fs.unlink(filePath);

        return uploadResponse; // Return Cloudinary upload response
    } catch (error) {
        console.error("Cloudinary Upload Error:", error.message);

        // Ensure temp file is deleted even if upload fails
        try {
            await fs.unlink(filePath);
        } catch (unlinkError) {
            console.warn("Failed to delete temp file:", unlinkError.message);
        }

        throw new Error("File upload failed: Please check the file and try again.");
    }
};

export default cloudinaryUploader;
