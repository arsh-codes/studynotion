import { setProfileLoading, setUser } from "@redux/slices/profileSlice";

import { apiConnector } from "@services/apiConnector";
import { logout } from "./authAPI";
import { profileEndpoints } from "../apis";
import { settingsEndpoints } from "@services/apis";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const {
  GET_USER_DETAILS_API,
  GET_USER_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_DATA_API,
} = profileEndpoints;

const {
  UPDATE_DISPLAY_PICTURE_API,
  REMOVE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints;

export function updateDisplayPicture(imageFile) {
  return async (dispatch) => {
    if (!imageFile) {
      toast.error("Please select an image to upload.");
      return;
    }

    const token = JSON.parse(localStorage.getItem("token")); // Fetch token inside the function

    if (!token) {
      toast.error("Authentication failed. Please log in again.");
      return;
    }

    const toastId = toast.loading("Updating profile picture...");
    dispatch(setProfileLoading(true));

    try {
      const file = imageFile instanceof FileList ? imageFile[0] : imageFile;
      if (!(file instanceof File)) {
        throw new Error("Invalid file selected.");
      }

      // Validate file type (only images allowed)
      const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validImageTypes.includes(file.type)) {
        throw new Error(
          "Invalid file type. Please upload a JPG, PNG, or WEBP image.",
        );
      }

      // Validate file size (e.g., max 2MB)
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        throw new Error(
          "File size exceeds 2MB. Please upload a smaller image.",
        );
      }

      const formData = new FormData();
      formData.append("displayPicture", file);

      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
        },
      );

      console.log("UPDATE DISPLAY PICTURE RESPONSE:", response);

      if (!response?.data?.success) {
        throw new Error(
          response?.data?.message || "Failed to update profile picture.",
        );
      }

      dispatch(setUser(response.data.updatedUser));
      toast.success("Profile picture updated successfully.");
    } catch (error) {
      console.error("UPDATE DISPLAY PICTURE ERROR:", error);
      toast.error(
        error.message ||
          "An error occurred while updating the profile picture.",
      );
    } finally {
      dispatch(setProfileLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function removeDisplayPicture() {
  return async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token")); // Fetch token inside the function

    if (!token) {
      toast.error("Authentication failed. Please log in again.");
      return;
    }

    const toastId = toast.loading("Removing profile picture...");
    dispatch(setProfileLoading(true));

    try {
      const response = await apiConnector(
        "PUT",
        REMOVE_DISPLAY_PICTURE_API,
        null, // No request body
        {
          Authorization: `Bearer ${token}`,
        },
      );

      console.log("REMOVE DISPLAY PICTURE RESPONSE:", response);

      if (!response?.data?.success) {
        throw new Error(
          response?.data?.message || "Failed to remove profile picture.",
        );
      }

      dispatch(setUser(response.data.updatedUser));
      toast.success("Profile picture removed successfully.");
    } catch (error) {
      console.error("REMOVE DISPLAY PICTURE ERROR:", error);
      toast.error(
        error.message ||
          "An error occurred while removing the profile picture.",
      );
    } finally {
      dispatch(setProfileLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function updateProfile(updatedData) {
  return async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token")); // Fetch token inside the function
    if (!token) {
      toast.error("Authentication failed. Please log in again.");
      return;
    }

    const toastId = toast.loading("Updating profile...");
    dispatch(setProfileLoading(true));

    try {
      const response = await apiConnector(
        "PUT",
        settingsEndpoints.UPDATE_PROFILE_API,
        updatedData,
        {
          Authorization: `Bearer ${token}`,
        },
      );

      console.log("UPDATE PROFILE RESPONSE:", response);

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Failed to update profile.");
      }
      const updatedUser = response.data.updatedUser;
      dispatch(setUser(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error("UPDATE PROFILE ERROR:", error);
      toast.error(
        error.message || "An error occurred while updating the profile.",
      );
    } finally {
      dispatch(setProfileLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("GET_USER_DETAILS API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;
      dispatch(setUser({ ...response.data.data, image: userImage }));
    } catch (error) {
      dispatch(logout(navigate));
      console.log("GET_USER_DETAILS API ERROR............", error);
      toast.error("Could Not Get User Details");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // )

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    toast.error("Could Not Get Enrolled Courses");
  }
  toast.dismiss(toastId);
  return result;
}

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("GET_INSTRUCTOR_DATA_API API RESPONSE............", response);
    result = response?.data?.courses;
  } catch (error) {
    console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error);
    toast.error("Could Not Get Instructor Data");
  }
  toast.dismiss(toastId);
  return result;
}
