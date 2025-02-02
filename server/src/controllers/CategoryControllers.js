// This file includes the following controllers:
//
// 1. createCategory
// 2. showAllCategories
// 3. getCategoryPageDetails

const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Validate request body to ensure the 'name' field is provided
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required to create a new category.",
            });
        }
        // Check if the category already exists
        const existingCategory = await Category.findOne({ categoryName: name });
        if (existingCategory) {
            return res.status(409).json({
                success: true,
                message: "This category already exists in database.",
            });
        }
        // Create category in the database with the provided details
        const newCategory = {
            categoryName: name,
        };
        if (description) {
            newCategory.categoryDescription = description;
        }
        const categoryDetails = await Category.create(newCategory);

        console.log("Category created successfully:", categoryDetails);
        return res.status(201).json({
            success: true,
            message: "Category created successfully.",
        });
    } catch (error) {
        console.error(`Error creating category: ${error.message}`);
        return res.status(500).json({
            success: false,
            message:
                "An unexpected error occurred while creating the category. Please try again later.",
        });
    }
};

exports.showAllCategories = async (req, res) => {
    try {
        // Fetch all categories, selecting only their name and description fields
        const allCategories = await Category.find(
            {},
            "categoryName categoryDescription"
        );

        return res.status(200).json({
            success: true,
            data: allCategories,
        });
    } catch (error) {
        console.error(`Error fetching categories: ${error.message}`);
        return res.status(500).json({
            success: false,
            message:
                "An unexpected error occurred while retrieving categories. Please try again later.",
        });
    }
};

/**
 * Controller to fetch category page details
 * This function retrieves details about a specific category, including its courses,
 * courses from other categories, and top-selling courses across all categories.
 */
exports.getCategoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;

        // Validate that the 'categoryId' field is provided in the request body
        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "Category ID is required to fetch details.",
            });
        }

        // Fetch category details and populate related course information
        const category = await Category.findById(categoryId).populate({
            path: "courses",
            populate: [
                { path: "instructor", select: "firstName lastName" },
                { path: "courseContent", populate: { path: "subSection" } },
                { path: "ratingAndReview" },
                { path: "category", select: "categoryName" },
            ],
        });

        // Check if the category exists
        if (!category) {
            console.error("Category not found with the provided ID.");
            return res.status(404).json({
                success: false,
                message: "The specified category does not exist.",
            });
        }

        // Check if the category contains any courses
        if (!category.courses || category.courses.length === 0) {
            console.error("No courses found for the selected category.");
            return res.status(404).json({
                success: false,
                message: "No courses are available for the selected category.",
            });
        }

        // Fetch courses from other categories, excluding the selected category
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        }).populate("courses");

        const differentCourses = categoriesExceptSelected.flatMap(
            (category) => category.courses || []
        );

        // Fetch all courses across all categories to determine the top-selling courses
        const allCategories = await Category.find().populate("courses");
        const allCourses = allCategories.flatMap(
            (category) => category.courses || []
        );

        // Sort courses by the 'sold' field and select the top 10
        const mostSellingCourses = allCourses
            .sort((a, b) => (b.sold || 0) - (a.sold || 0))
            .slice(0, 10);

        return res.status(200).json({
            success: true,
            data: {
                selectedCourses: category.courses, // Courses for the requested category
                differentCourses, // Courses from other categories
                mostSellingCourses, // Top-selling courses
            },
        });
    } catch (error) {
        console.error(`Error fetching category details: ${error.message}`); // Log detailed error message
        return res.status(500).json({
            success: false,
            message:
                "An unexpected error occurred while fetching category details. Please try again later.",
        });
    }
};
