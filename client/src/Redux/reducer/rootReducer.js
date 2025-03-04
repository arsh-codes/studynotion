import authReducer from "../slices/authSlice";
import cartReducer from "../slices/cartSlice";
import { combineReducers } from "@reduxjs/toolkit";
import profileReducer from "../slices/profileSlice";

// Root reducer combining all slice reducers
const rootReducer = combineReducers({
  auth: authReducer, // Handles authentication state (login, token, etc.)
  profile: profileReducer, // Manages user profile details
  cart: cartReducer, // Stores cart-related data
});

export default rootReducer;
