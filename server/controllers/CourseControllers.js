// This file includes the following controllers:
//
// 1. createCourse      
// 2. getAllCourses     
// 3. getCourseDetails  


const Course = require("../models/Course");
const Category = require("../models/Category");
const Tag = require("../models/Tag");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/cloudinaryUploader");

// Controller function to create a new Course
exports.createCourse = async (req, res) => {
    try {
        // Destructure required fields from the request body
        const {
            courseName,
            courseDescription,
            price,
            category,
            tag,
            whatYouWillLearn,
        } = req.body;
        const { thumbnail } = req.files;

        // Check if required fields are provided
        if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !category ||
            !tag ||
            !thumbnail
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "All fields (courseName, courseDescription, price, category, tag, thumbnail) are required.",
            });
        }

        // Fetch the category by categoryName and ensure it exists
        const categoryDetails = await Category.findOne({
            categoryName: category,
        });
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category not found.",
            });
        }

        // Fetch the tag by tagName and ensure it exists
        const tagDetails = await Tag.findOne({ tagName: tag });
        if (!tagDetails) {
            return res.status(404).json({
                success: false,
                message: "Tag not found.",
            });
        }

        // Upload the thumbnail image to Cloudinary
        const thumbnailUploadResult = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME || "studyNotion"
        );

        // Create a new course with the provided details
        const course = await Course.create({
            courseName,
            courseDescription,
            price,
            category: categoryDetails._id,
            whatYouWillLearn,
            tag: tagDetails._id,
            thumbnail: thumbnailUploadResult.secure_url,
            instructor: req.user._id, // Instructor is the logged-in user
        });

        // Update instructor with the new course ID
        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { courses: course._id } },
            { new: true }
        );

        // Update tag with the new course ID
        await Tag.findByIdAndUpdate(
            tagDetails._id,
            { $push: { courses: course._id } },
            { new: true }
        );

        // Respond with success message and created course data
        return res.status(201).json({
            success: true,
            message: "Course created successfully.",
            course,
        });
    } catch (error) {
        console.error("Error creating course:", error.message);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the course.",
            error: error.message, // Include error message for debugging
        });
    }
};

// Controller function to retrieve all Courses
exports.getAllCourses = async (req, res) => {
    try {
        // Fetch all Courses
        const allCourses = await Course.find({})
            .populate("instructor") // Populate the 'instructor' field with full user data
            .populate("tag") // Populate the 'tag' field with the full tag data
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
exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.params;

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
            .populate("tag", "tagName") // Populate tag with selected fields
            .exec();

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
