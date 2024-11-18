// Import the Course, Tag, and User models, and the image uploader utility
const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

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

        // Fetch the tag by tagName and ensure it exists
        const categoryDetails = await Category.findOne({ categoryName: category });
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category not found.",
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
            category:categoryDetails._id,
            whatYouWillLearn,
            tag,
            thumbnail: thumbnailUploadResult.secure_url,
            instructor: req.user._id,
        });

        // Update instructor with the new course ID
        await User.findOneAndUpdate(
            { _id: instructorDetails._id },
            { $push: { courses: course._id } },
            { new: true }
        );

        // Update tag with the new course ID
        await Category.findOneAndUpdate(
            { _id: tagDetails._id },
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
        });
    }
};

// Controller function to retrieve all Courses
exports.showAllCourses = async (req, res) => {
    try {
        // Fetch all Courses
        const allCourses = await Course.find({})
            .populate("instructor") // Populate the 'instructor' field with full user data
            .populate("tag") // Populate the 'tag' field with the full tag data
            .exec();

        console.log(allCourses);

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
        });
    }
};