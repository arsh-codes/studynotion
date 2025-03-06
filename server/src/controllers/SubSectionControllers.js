import Section from "../models/Section.js";
// This file includes the following controllers:
//
// 1. createSubSection
// 2. updateSubSection
// 3. deleteSubSection
// Import required models and utilities
import SubSection from "../models/SubSection.js";
import cloudinaryUploader from "../utils/cloudinaryUploader.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

/**
 * Controller to create a new SubSection and associate it with a Section.
 */
export const createSubSection = async (req, res) => {
    try {
        const { sectionId, title, timeDuration, description } = req.body;
        const { videoFile } = req.files;

        // Validate inputs
        if (
            !sectionId ||
            !title ||
            !timeDuration ||
            !description ||
            !videoFile
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "All fields (sectionId, title, timeDuration, description, videoFile) are required.",
            });
        }

        // Check if the section exists
        const section = await Section.findById(sectionId);
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found.",
            });
        }

        // Upload video file to Cloudinary
        const uploadResult = await uploadImageToCloudinary(
            videoFile,
            process.env.CLOUDINARY_FOLDER_NAME
        );

        // Validate Cloudinary upload
        if (!uploadResult || !uploadResult.secure_url) {
            return res.status(500).json({
                success: false,
                message: "Failed to upload video to Cloudinary.",
            });
        }

        // Create the new SubSection
        const newSubSection = await SubSection.create({
            title,
            timeDuration,
            description,
            videoUrl: uploadResult.secure_url,
        });

        // Add the new SubSection to the Section
        section.subSections.push(newSubSection._id);
        await section.save();

        // Respond with success
        return res.status(201).json({
            success: true,
            message:
                "SubSection created successfully and linked to the section.",
            subSection: newSubSection,
        });
    } catch (error) {
        console.error("Error creating SubSection:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while creating the SubSection.",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Internal Server Error",
        });
    }
};

/**
 * Controller to update an existing SubSection.
 */
export const updateSubSection = async (req, res) => {
    try {
        const { subSectionId, title, timeDuration, description } = req.body;

        // Validate inputs - At least one field should be provided for update
        if (!subSectionId || (!title && !timeDuration && !description)) {
            return res.status(400).json({
                success: false,
                message:
                    "SubSection ID and at least one field (title, timeDuration, description) are required to update.",
            });
        }

        // Update the SubSection by its ID
        const updatedSubSection = await SubSection.findByIdAndUpdate(
            subSectionId,
            { title, timeDuration, description },
            { new: true } // Return the updated document
        );

        if (!updatedSubSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found.",
            });
        }

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "SubSection updated successfully.",
            subSection: updatedSubSection,
        });
    } catch (error) {
        console.error("Error updating SubSection:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating the SubSection.",
            error: error.message,
        });
    }
};

/**
 * Controller to delete a SubSection from a Section.
 */
export const deleteSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId } = req.body;

        // Validate inputs
        if (!sectionId || !subSectionId) {
            return res.status(400).json({
                success: false,
                message: "Both sectionId and subSectionId are required.",
            });
        }

        // Check if the section exists
        const section = await Section.findById(sectionId);
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found.",
            });
        }

        // Check if the subSection exists
        const subSection = await SubSection.findById(subSectionId);
        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found.",
            });
        }

        // Remove the SubSection reference from the Section
        section.subSections.pull(subSectionId);
        await section.save();

        // Delete the SubSection document from the database
        await SubSection.findByIdAndDelete(subSectionId);

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "SubSection deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting SubSection:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while deleting the SubSection.",
            error: error.message,
        });
    }
};
