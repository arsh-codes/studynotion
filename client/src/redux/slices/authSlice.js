import { createSlice } from "@reduxjs/toolkit";

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
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData: (state, action) => {
      state.signupData = { ...state.signupData, ...action.payload };
    },
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("token", action.payload);
        state.isLoggedIn = true;
      } else {
        localStorage.removeItem("token");
        state.isLoggedIn = false;
      }
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setSignupData, setAuthLoading, setToken, setIsLoggedIn } =
  authSlice.actions;
export default authSlice.reducer;
