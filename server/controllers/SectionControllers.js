// This file includes the following controllers:
//
// 1. createSection 
// 2. updateSection
// 3. deleteSection


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

        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found.",
            });
        }

        // Create a new section
        const newSection = await Section.create({ sectionName });

        // Add the new section to the course
        course.courseContent.push(newSection._id);
        const updatedCourse = await course.save();

        // Populate the course with the new section and any sub-sections
        await updatedCourse
            .populate("courseContent")
            .populate({ path: "courseContent.subSection" })
            .execPopulate();

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "Section created and added to course successfully.",
            updatedCourse,
        });
    } catch (error) {
        console.error("Error creating section:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the section.",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Internal Server Error",
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
            sectionId,
            { sectionName },
            { new: true }
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
        console.error("Error updating section:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the section.",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Internal Server Error",
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

        // Check if the course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found.",
            });
        }

        // Remove the section from the course's courseContent array
        course.courseContent.pull(sectionId);
        const updatedCourse = await course.save();

        // Delete the section itself
        await Section.findByIdAndDelete(sectionId);

        // Populate the course with updated sections
        await updatedCourse
            .populate("courseContent")
            .populate({ path: "courseContent.subSection" })
            .execPopulate();

        // Respond with success
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully.",
            updatedCourse,
        });
    } catch (error) {
        console.error("Error deleting section:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the section.",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Internal Server Error",
        });
    }
};
