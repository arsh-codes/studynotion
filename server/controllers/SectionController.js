const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body;

        // Validate input
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Section name and course ID are required.",
            });
        }

        // Create a new section
        const newSection = await Section.create({ sectionName });

        // Update the course to include the new section
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId, // Find the course by its ID
            { $push: { courseContent: newSection._id } }, // Add the new section
            { new: true } // Return the updated course
        )
            .populate("courseContent") // Populate courseContent
            .populate({ path: "courseContent.subSection" }); // Populate subSection within courseContent if exists

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "Section created and added to course successfully.",
            updatedCourse,
        });
    } catch (error) {
        console.error("Error creating section:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the section.",
        });
    }
};

exports.updateSection = async (req, res) => {
    try {
        const { sectionName, sectionId } = req.body;

        // Validate input
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Section name and section ID are required.",
            });
        }

        // Update the section by its ID
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId, // Find the section by its ID
            { sectionName }, // Update the section name
            { new: true } // Return the updated section
        );

        if (!updatedSection) {
            return res.status(404).json({
                success: false,
                message: "Section not found.",
            });
        }

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "Section updated successfully.",
            updatedSection,
        });
    } catch (error) {
        console.error("Error updating section:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the section.",
        });
    }
};

exports.deleteSection = async (req, res) => {
    try {
        const { sectionId, courseId } = req.body;

        // Validate input
        if (!sectionId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Section ID and Course ID are required.",
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

        // Remove the section from the course's courseContent array
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId, // Find the course by its ID
            { $pull: { courseContent: sectionId } }, // Remove the section ID from courseContent
            { new: true } // Return the updated course
        )
            .populate("courseContent") // Populate courseContent for response
            .populate({ path: "courseContent.subSection" }); // Populate subSection if exists

        // Check if the course exists
        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found.",
            });
        }

        // Delete the section itself
        await Section.findByIdAndDelete(sectionId);

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully.",
            updatedCourse,
        });
    } catch (error) {
        console.error("Error deleting section:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the section.",
        });
    }
};
