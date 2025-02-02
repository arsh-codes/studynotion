// Importing the cloudinary module and file system (fs) module for handling files.
// In TypeScript, using 'import' syntax is preferred for ES modules.
import cloudinary from "cloudinary"; // changed: using 'import' for ES module compatibility
import fs from "fs"; // changed: 'import' for the file system module

// Define types for function parameters to ensure correct structure and type safety.
interface CloudinaryUploaderOptions {
    // changed: 'interface' to define the structure of the parameter object
    folderName: string; // changed: type 'string' for folder name, required
    height?: number; // changed: optional 'number' type for height
    quality?: number; // changed: optional 'number' type for quality
}

// Function to upload a file to Cloudinary
const cloudinaryUploader = async (
    file: string, // The file path as a string, the input file.
    { folderName, height, quality }: CloudinaryUploaderOptions // Destructured parameters with explicit types.
) => {
    try {
        // Initialize the options object with the provided folder name.
        const options: cloudinary.UploadApiOptions = {
            // changed: 'options' typed explicitly as 'UploadApiOptions'
            folder: folderName, // The folder where the file will be stored on Cloudinary
            resource_type: "auto", // Automatically determines resource type (image, video, etc.)
        };

        // Conditionally add 'height' and 'quality' to options if provided and valid.
        // Using type checking with 'isNaN' to ensure values are valid numbers.
        if (height && !isNaN(height)) options.height = height; // changed: checked if 'height' is a valid number before assigning
        if (quality && !isNaN(quality)) options.quality = quality; // changed: checked if 'quality' is a valid number before assigning

        // Upload the file to Cloudinary using the specified options.
        const uploadResponse = await cloudinary.v2.uploader.upload(
            file, // The file path
            options // The options object that specifies upload configurations
        );

        // Delete the temp file after successful upload using fs.promises.unlink to remove the file.
        await fs.promises.unlink(file); // changed: used fs.promises.unlink for async file deletion

        // Return the upload response, which contains details like URL, public_id, etc.
        return uploadResponse; // changed: returning the response with upload details
    } catch (error: unknown) {
        // changed: used 'unknown' for error type to ensure safer handling
        // Type assertion to handle the error as an instance of the Error class
        if (error instanceof Error) {
            // changed: type guard to check if error is an instance of Error
            console.error("Error uploading file to Cloudinary:", error.message); // changed: logging specific error message
            throw new Error(
                "File upload failed: Please check the file and try again." // changed: user-friendly error message
            );
        } else {
            // Fallback for errors that are not instances of the Error class.
            console.error("An unknown error occurred during file upload");
            throw new Error("File upload failed due to an unknown error.");
        }
    }
};

export default cloudinaryUploader; // Exporting the cloudinaryUploader function for use in other parts of the app.
