const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/cloudinaryUploader");
require("dotenv").config();

// Create SubSection
exports.createSubSection = async (req, res) => {
    try {
        const { sectionId, title, timeDuration, description } = req.body;
        const { videoFile } = req.files;

        // Validate inputs
        if (!sectionId || !title || !timeDuration || !description || !videoFile) {
            return res.status(400).json({
                success: false,
                message: "All fields (sectionId, title, timeDuration, description, videoFile) are required.",
            });
        }

        // Upload video file to Cloudinary
        const uploadResult = await uploadImageToCloudinary(
            videoFile,
            process.env.CLOUDINARY_FOLDER_NAME
        );

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

        // Update the Section with the new SubSection
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId, // Find section by ID
            { $push: { subSections: newSubSection._id } }, // Add the new subsection ID
            { new: true } // Return the updated section
        );

        if (!updatedSection) {
            return res.status(404).json({
                success: false,
                message: "Section not found. SubSection was created but not linked.",
            });
        }

        // Respond with success
        return res.status(201).json({
            success: true,
            message: "SubSection created successfully and linked to the section.",
            subSection: newSubSection,
        });
    } catch (error) {
        console.error("Error creating subsection:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the SubSection.",
            error: error.message,
        });
    }
};

// Update SubSection
exports.updateSubSection = async (req, res) => {
    try {
        const { subSectionId, title, timeDuration, description } = req.body;

        // Validate inputs
        if (!subSectionId || (!title && !timeDuration && !description)) {
            return res.status(400).json({
                success: false,
                message: "SubSection ID and at least one field to update are required.",
            });
        }

        // Update the SubSection
        const updatedSubSection = await SubSection.findByIdAndUpdate(
            subSectionId,
            { title, timeDuration, description },
            { new: true } // Return the updated SubSection
        );

        if (!updatedSubSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "SubSection updated successfully.",
            subSection: updatedSubSection,
        });
    } catch (error) {
        console.error("Error updating subsection:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the SubSection.",
            error: error.message,
        });
    }
};

// Delete SubSection
exports.deleteSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId } = req.body;

        // Validate inputs
        if (!sectionId || !subSectionId) {
            return res.status(400).json({
                success: false,
                message: "Both sectionId and subSectionId are required.",
            });
        }

        // Remove the SubSection from the Section
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            { $pull: { subSections: subSectionId } }, // Remove SubSection reference
            { new: true } // Return updated Section
        );

        if (!updatedSection) {
            return res.status(404).json({
                success: false,
                message: "Section not found. Cannot remove SubSection.",
            });
        }

        // Delete the SubSection
        const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId);

        if (!deletedSubSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "SubSection deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting subsection:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the SubSection.",
            error: error.message,
        });
    }
};
