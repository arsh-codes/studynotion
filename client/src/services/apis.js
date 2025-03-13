// Base URL for backend API, fetched from environment variables
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

// Endpoint for checking backend connection
export const checkConnectionEndpoint = {
  CHECK_CONNECTION_API: `${BASE_URL}/check/connection`, // API to verify server status
};

// AUTH ENDPOINTS - Handles user authentication operations
export const endpoints = {
  SENDOTP_API: `${BASE_URL}/auth/sendotp`, // Send OTP for verification
  SIGNUP_API: `${BASE_URL}/auth/signup`, // Register a new user
  LOGIN_API: `${BASE_URL}/auth/login`, // User login
  RESETPASSTOKEN_API: `${BASE_URL}/auth/resetPasswordTokenMail`, // Send reset password token via email
  RESETPASSWORD_API: `${BASE_URL}/auth/resetPassword`, // Reset password
};

// PROFILE ENDPOINTS - Related to user profile data
export const profileEndpoints = {
  GET_USER_DETAILS_API: `${BASE_URL}/profile/getUserDetails`, // Fetch user details
  GET_USER_ENROLLED_COURSES_API: `${BASE_URL}/profile/getEnrolledCourses`, // Fetch courses the user is enrolled in
};

// STUDENT ENDPOINTS - Payment-related APIs for students
export const studentEndpoints = {
  COURSE_PAYMENT_API: `${BASE_URL}/payment/capturePayment`, // Capture course payment
  COURSE_VERIFY_API: `${BASE_URL}/payment/verifyPayment`, // Verify payment status
  SEND_PAYMENT_SUCCESS_EMAIL_API: `${BASE_URL}/payment/sendPaymentSuccessEmail`, // Send email on successful payment
};

// COURSE ENDPOINTS - Handles course management operations
export const courseEndpoints = {
  GET_ALL_COURSE_API: `${BASE_URL}/course/getAllCourses`, // Get list of all available courses
  COURSE_DETAILS_API: `${BASE_URL}/course/getCourseDetails`, // Fetch details of a specific course
  EDIT_COURSE_API: `${BASE_URL}/course/editCourse`, // Edit an existing course
  COURSE_CATEGORIES_API: `${BASE_URL}/course/showAllCategories`, // Get all course categories
  CREATE_COURSE_API: `${BASE_URL}/course/createCourse`, // Create a new course
  CREATE_SECTION_API: `${BASE_URL}/course/addSection`, // Add a new section to a course
  CREATE_SUBSECTION_API: `${BASE_URL}/course/addSubSection`, // Add a new subsection within a section
  UPDATE_SECTION_API: `${BASE_URL}/course/updateSection`, // Update course section details
  UPDATE_SUBSECTION_API: `${BASE_URL}/course/updateSubSection`, // Update subsection details
  GET_ALL_INSTRUCTOR_COURSES_API: `${BASE_URL}/course/getInstructorCourses`, // Fetch courses created by an instructor
  DELETE_SECTION_API: `${BASE_URL}/course/deleteSection`, // Delete a course section
  DELETE_SUBSECTION_API: `${BASE_URL}/course/deleteSubSection`, // Delete a subsection from a section
  DELETE_COURSE_API: `${BASE_URL}/course/deleteCourse`, // Remove a course
  GET_FULL_COURSE_DETAILS_AUTHENTICATED: `${BASE_URL}/course/getFullCourseDetails`, // Fetch full course details (authenticated users only)
  LECTURE_COMPLETION_API: `${BASE_URL}/course/updateCourseProgress`, // Mark lecture as completed
  CREATE_RATING_API: `${BASE_URL}/course/createRating`, // Submit a course rating
};

// RATINGS & REVIEWS - Handles review system for courses
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: `${BASE_URL}/course/getReviews`, // Fetch course reviews
};

// CATEGORIES API - Handles course category management
export const categories = {
  SHOW_ALL_CATEGORIES_API: `${BASE_URL}/courses/showAllCategories`, // Get all course categories
};

// CATALOG PAGE DATA - Fetches data for category-specific catalog pages
export const catalogData = {
  CATALOGPAGEDATA_API: `${BASE_URL}/course/getCategoryPageDetails`, // Get category page details
};

// CONTACT US API - Handles user inquiries via contact form
export const contactusEndpoint = {
  CONTACT_US_API: `${BASE_URL}/reach/contact`, // Submit a contact request
};

// SETTINGS PAGE API - Handles user account settings
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: `${BASE_URL}/profile/updateDisplayPicture`, // Change profile picture
  UPDATE_PROFILE_API: `${BASE_URL}/profile/updateProfile`, // Update user profile details
  CHANGE_PASSWORD_API: `${BASE_URL}/auth/changepassword`, // Change user password
  DELETE_PROFILE_API: `${BASE_URL}/profile/deleteProfile`, // Delete user account permanently
};
