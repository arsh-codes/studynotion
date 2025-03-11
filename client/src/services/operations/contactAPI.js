import { apiConnector } from "../apiConnector";
import { contactusEndpoint } from "../apis";
import toast from "react-hot-toast";

export async function contactUs(data, setLoading) {
  return async (dispatch) => {
    try {
      setLoading(true);

      // Destructuring input data
      const { countryCode, email, firstName, lastName, message, phone } = data;

      // Basic validation to ensure all fields are filled
      if (
        !countryCode ||
        !email ||
        !firstName ||
        !lastName ||
        !message ||
        !phone
      ) {
        throw new Error(
          "All fields are required. Please fill out the form completely.",
        );
      }

      // Making API call to send contact details
      const response = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data,
      );

      console.log("📝 -> contactUs -> response=", response);

      // Checking if the API response is successful
      if (!response?.data?.success) {
        throw new Error(
          response?.data?.message ||
            "Failed to send message. Please try again.",
        );
      }

      // Success toast message
      toast.success(
        "Your message has been sent successfully! Our team will get back to you soon.",
      );
    } catch (error) {
      console.error(" Error in contactUs:", error);
      toast.error(
        error.message ||
          "An unexpected error occurred. Please try again later.",
      );
    } finally {
      setLoading(false); // Ensure loading is set to false after API call
    }
  };
}
