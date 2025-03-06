// This file includes the following controllers:
//
// 1. createCourse
// 2. getAllCourses
// 3. getCourseDetails

import Category from "../models/Category.js";
import Course from "../models/Course.js";
import Tag from "../models/Tag.js";
import User from "../models/User.js";
import cloudinaryUploader from "../utils/cloudinaryUploader.js";

export const createCourse = async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            courseName,
            courseDescription,
            price,
            categoryName,
            tags,
            whatYouWillLearn,
        } = req.body;
        const { thumbnailImage } = req.files;

        // Check if required fields are provided
        if (
            !courseName ||
            !courseDescription ||
            !price ||
            !categoryName ||
            !tags ||
            !whatYouWillLearn ||
            !thumbnailImage
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "All fields (courseName, courseDescription, price, categoryName, tags, whatYouWillLearn, thumbnailImage) are required.",
            });
        }

        // Fetch category details to check if the category is valid
        const categoryDetails = await Category.findOne({ categoryName });
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: `Category "${categoryName}" not found. Please provide a valid category.`,
            });
        }

        // Split the input string into an array of tags and trim spaces.
        const tagsArray = tags.split(",").map((tag) => tag.trim());

        // Collect invalid tags by checking their existence in the database.
        const invalidTags = [];
        const tagsIdArray = [];
        for (const tag of tagsArray) {
            const tagInDb = await Tag.findOne({ tagName: tag }); // FIXED: Using `findOne` instead of `exists` to fetch the tag object
            if (!tagInDb) {
                invalidTags.push(tag); // Add to invalidTags if not found.
                continue;
            }
            tagsIdArray.push(tagInDb._id); // Add tag ID if found.
        }

        // If any tags are invalid, return an error response with their names.
        if (invalidTags.length > 0) {
            return res.status(400).json({
                success: false,
                message: `The following tags are invalid: ${invalidTags.join(
                    ", "
                )}.`,
            });
        }
        if (isNaN(price) || price <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid price. It must be a positive number.",
            });
        }

        // Upload thumbnailImage to Cloudinary
        const thumbnailImageUploadResult = await cloudinaryUploader(
            thumbnailImage.tempFilePath,
            process.env.FOLDER_NAME
        );

        // Create a new course with the provided details
        const course = await Course.create({
            courseName,
            courseDescription,
            price,
            category: categoryDetails._id,
            whatYouWillLearn,
            tags: tagsIdArray,
            thumbnailImage: thumbnailImageUploadResult.secure_url,
            instructor: userId, // Instructor is the logged-in user
        });

        // Add course to instructor's courses array
        await User.findByIdAndUpdate(userId, {
            $push: { courses: course._id },
        });

        // Update each tag with the new course
        for (const tag of tagsArray) {
            await Tag.findOneAndUpdate(
                { tagName: tag }, // Find the tag by its name
                { $push: { courses: course._id } } // Add the course ID to the "courses" array
            );
        }

        // Respond with success message and created course data
        return res.status(201).json({
            success: true,
            message: "Course created successfully.",
            course,
        });
    } catch (error) {
        console.error("Error creating course:", error.message, error); // Log detailed error for debugging.
        return res.status(500).json({
            success: false,
            message:
                "An error occurred while creating the course. Please try again later.",
        });
    }
};

// Controller function to retrieve all Courses
export const getAllCourses = async (req, res) => {
    try {
        // Fetch all Courses
        const allCourses = await Course.find({})
            .populate("instructor", "name email") // Populate instructor with selected fields
            .populate("category", "categoryName") // Populate category with selected fields
            .populate("tags", "tagName") // Populate tag with selected fields
            .exec();

        // Respond with success and return all courses
        return res.status(200).json({
            success: true,
            message: "Courses retrieved successfully.",
            courses: allCourses,
        });
    } catch (error) {
        console.error("Error retrieving courses:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while retrieving courses.",
            error: error.message, // Include error message for debugging
        });
    }
};

// Controller function to retrieve details of a single course
export const getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;

        // Check if courseId is provided
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required to fetch course details.",
            });
        }

        // Fetch course details by ID
        const courseDetails = await Course.findById(courseId)
            .populate("instructor", "name email") // Populate instructor with selected fields
            .populate("category", "categoryName") // Populate category with selected fields
            .populate("tags", "tagName") // Populate tag with selected fields
            .exec(); // Executes the query and returns a promise and helps make code more consistent, especially when you need to handle promises with .then().

        // Check if the course exists
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Course not found.",
            });
        }

        // Respond with course details
        return res.status(200).json({
            success: true,
            message: "Course details retrieved successfully.",
            course: courseDetails,
        });
    } catch (error) {
        //FIXED: Added error handling for course retrieval
        console.error("Error fetching course details:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while retrieving the course details.",
        });
    }
};
