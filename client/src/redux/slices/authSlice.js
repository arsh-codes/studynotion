import { createSlice } from "@reduxjs/toolkit";

// Safely retrieve the token from localStorage
const getStoredToken = () => {
  try {
    const token = localStorage.getItem("token");
    return token ? token : null; // Return token if present, otherwise null
  } catch (error) {
    console.error("Error retrieving token from localStorage:", error);
    return null; // If an error occurs, initialize as null
  }
};

const initialState = {
  signupData: {
    accountType: "student",
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  },
  authLoading: false,
  token: getStoredToken(), // Initialize token safely
  isLoggedIn: !!getStoredToken(), // Set login status based on token presence
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Update signup data while keeping existing values
    setSignupData: (state, action) => {
      state.signupData = { ...state.signupData, ...action.payload };
    },

    // Set authentication loading state
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },

    // Manage token storage and login status
    setToken: (state, action) => {
      try {
        state.token = action.payload;
        if (action.payload) {
          localStorage.setItem("token", action.payload); // Store token in localStorage
          state.isLoggedIn = true;
        } else {
          localStorage.removeItem("token"); // Remove token on logout
          state.isLoggedIn = false;
        }
      } catch (error) {
        console.error("Error setting token in localStorage:", error);
      }
    },

    // Explicitly update the login status
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

// Export actions for dispatching in components
export const { setSignupData, setAuthLoading, setToken, setIsLoggedIn } =
  authSlice.actions;

// Export the reducer to be included in the Redux store
export default authSlice.reducer;
