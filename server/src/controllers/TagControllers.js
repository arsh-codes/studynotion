// This file includes the following controllers:
//
// 1. createTag
// 2. showAllTags

// Import the Tag model
import Tag from "../models/Tag.js";

/**
 * Controller to create a new tag.
 */
export const createTag = async (req, res) => {
    try {
        const { tagName } = req.body;

        // Validate request body to ensure 'tagName' is provided
        if (!tagName) {
            return res.status(400).json({
                success: false,
                message: "Tag name is required to create a new tag.",
            });
        }

        // Check if the tag already exists in the database
        const existingTag = await Tag.findOne({ tagName });
        if (existingTag) {
            return res.status(409).json({
                success: false,
                message: "This tag already exists in the database.",
            });
        }

        // Create a new tag in the database
        const tagDetails = await Tag.create({ tagName });

        console.log("Tag created successfully:", tagDetails);

        return res.status(201).json({
            success: true,
            message: "Tag created successfully.",
            tag: tagDetails, // Returning the created tag for confirmation
        });
    } catch (error) {
        console.error(`Error creating tag: ${error.message}`);
        return res.status(500).json({
            success: false,
            message:
                "An unexpected error occurred while creating the tag. Please try again later.",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Internal Server Error",
        });
    }
};

/**
 * Controller to retrieve all tags.
 */
export const showAllTags = async (req, res) => {
    try {
        // Fetch all tags, selecting only the 'tagName' field
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
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Internal Server Error",
        });
    }
};
