// Import the Tag model to interact with the database
const Tag = require("../models/Tag");

// Controller function to create a new tag
exports.createTag = async (req, res) => {
    try {
        // Destructure name and description from the request body
        const { name, description } = req.body;

        // Check if both name and description are provided
        if (!name || !description) {
            return res.status(400).json({
                successful: false,
                message:
                    "Please provide both name and description for the tag.",
            });
        }

        // Create a new tag in the database
        const tag = await Tag.create({
            tagName: name,
            description,
        });
        console.log("📝 -> New tag created:", tag);

        // Respond with success and return the created tag
        return res.status(201).json({
            successful: true,
            message: "Tag created successfully.",
            tag,
        });
    } catch (error) {
        return res.status(500).json({
            successful: false,
            message:
                "An internal server error occurred while creating the tag.",
        });
    }
};

// Controller function to retrieve all tags
exports.showAllTags = async (req, res) => {
    try {
        // Fetch all tags, returning only the name and description fields
        const allTags = await Tag.find({}, { name: true, description: true });

        // Respond with success and return all tags
        return res.status(200).json({
            successful: true,
            message: "Tags retrieved successfully.",
            tags: allTags,
        });
    } catch (error) {
        return res.status(500).json({
            successful: false,
            message: "An internal server error occurred while retrieving tags.",
        });
    }
};
