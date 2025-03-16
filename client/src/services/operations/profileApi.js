import { setProfileLoading, setUser } from "@redux/slices/profileSlice";

import { apiConnector } from "@services/apiConnector";
import { settingsEndpoints } from "@services/apis";
import { toast } from "react-hot-toast";

const { UPDATE_DISPLAY_PICTURE_API } = settingsEndpoints;

export function updateDisplayPicture(imageFile) {
  return async (dispatch, getState) => {
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
