const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/cloudinaryUploader");
require("dotenv").config();

exports.createSubSection = async (req, res) => {
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

        // Upload video file to Cloudinary
        const uploadResult = await uploadImageToCloudinary(
            videoFile,
            process.env.CLOUDINARY_FOLDER_NAME
        );

        // Create the new SubSection
        const newSubsection = await SubSection.create({
            title,
            timeDuration,
            description,
            videoUrl: uploadResult.secure_url,
        });

        // Update the Section with the new SubSection
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId, // Find section by ID
            { $push: { subSection: newSubsection._id } }, // Add the new subsection ID
            { new: true } // Return the updated section
        );

        if (!updatedSection) {
            return res.status(404).json({
                success: false,
                message: "Section not found.",
            });
        }

        // Respond with success
        return res.status(201).json({
            success: true,
            message: "Subsection created successfully and added to section.",
            newSubsection,
        });
    } catch (error) {
        console.error("Error creating subsection:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the subsection.",
        });
    }
};
