import { createSlice } from "@reduxjs/toolkit";

// Initial state with a `user` property, initially set to null
const initialState = {
  user: null,
  profileLoading: false,
};

// Creating a Redux slice for managing user profile data
const profileSlice = createSlice({
  name: "profile", // Name of the slice
  initialState: initialState, // Initial state for this slice
  reducers: {
    // Action to update user details in the state
    setUser(state, value) {
      state.user = value.payload; // Updates the `user` with the provided value
    },
    setProfileLoading: (state, action) => {
      state.profileLoading = action.payload;
    },
  },
});

// Exporting the action for use in components
export const { setUser, setProfileLoading } = profileSlice.actions;

// Exporting the reducer to be used in the Redux store
export default profileSlice.reducer;
