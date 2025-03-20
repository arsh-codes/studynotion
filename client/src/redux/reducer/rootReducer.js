import authReducer from "@redux/slices/authSlice";
import cartReducer from "@redux/slices/cartSlice";
import { combineReducers } from "@reduxjs/toolkit";
import connectionReducer from "@redux/slices/connectionSlice";
import courseReducer from "@redux/slices/courseSlice";
import profileReducer from "@redux/slices/profileSlice";
import viewCourseReducer from "@redux/slices/viewCourseSlice";
// Root reducer combining all slice reducers
const rootReducer = combineReducers({
  auth: authReducer, // Handles authentication state (login, token, etc.)
  profile: profileReducer, // Manages user profile details
  cart: cartReducer, // Stores cart-related data
  connection: connectionReducer,
  course: courseReducer,
  viewCourse: viewCourseReducer,
});

export default rootReducer;
