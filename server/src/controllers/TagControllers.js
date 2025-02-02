// This file includes the following controllers:
//
// 1. createTag
// 2. showAllTags
const Tag = require("../models/Tag");

exports.createTag = async (req, res) => {
    try {
        const { tagName } = req.body;

        // Validate request body to ensure the 'name' field is provided
        if (!tagName) {
            return res.status(400).json({
                success: false,
                message: "Tag name is required to create a new tag.",
            });
        }

        // Check if the tag already exists
        const existingTag = await Tag.findOne({ tagName: tagName });
        if (existingTag) {
            return res.status(409).json({
                success: false,
                message: "This tag already exists in the database.",
            });
        }

        // Create tag in the database with the provided details
        const tagDetails = await Tag.create({
            tagName: tagName,
        });

        console.log("Tag created successfully:", tagDetails);

        return res.status(201).json({
            success: true,
            message: "Tag created successfully.",
        });
    } catch (error) {
        console.error(`Error creating tag: ${error.message}`);
        return res.status(500).json({
            success: false,
            message:
                "An unexpected error occurred while creating the tag. Please try again later.",
        });
    }
};

// Controller to show all Tags
exports.showAllTags = async (req, res) => {
    try {
        // Fetch all tags, selecting only their name and description fields
        const allTags = await Tag.find({}, "tagName");

        return res.status(200).json({
            success: true,
            data: allTags,
        });
    } catch (error) {
        console.error(`Error fetching tags: ${error.message}`);
        return res.status(500).json({
            success: false,
            message:
                "An unexpected error occurred while retrieving tags. Please try again later.",
        });
    }
};
