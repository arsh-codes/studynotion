import { createSlice } from "@reduxjs/toolkit";

// Initial state for authentication
const initialState = {
  // Stores user signup data temporarily
  signupData: null,
  // Loading state to manage async operations
  loading: false,
  // Retrieves token from localStorage if available, otherwise sets it to null
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
};

// Creating an authentication slice using Redux Toolkit
const authSlice = createSlice({
  name: "auth", // Slice name
  initialState: initialState, // Initial state object
  reducers: {
    // Action to set signup data
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    // Action to set loading state
    setLoading(state, value) {
      state.loading = value.payload;
    },
    // Action to update authentication token
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

// Exporting actions for use in components and thunks
export const { setSignupData, setLoading, setToken } = authSlice.actions;

// Exporting the reducer to be included in the store
export default authSlice.reducer;
