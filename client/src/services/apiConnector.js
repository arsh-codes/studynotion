import axios from "axios";

// Create an Axios instance with default configurations
export const axiosInstance = axios.create({
  baseURL: "https://your-api-base-url.com", // Optional: Set a base URL for all requests
  timeout: 10000, // Optional: Set a request timeout (10 seconds)
});
export const apiConnector = async (
  method,
  url,
  data = {},
  headers = {},
  params = {},
) => {
  try {
    // Make the API request using the Axios instance
    const response = await axiosInstance({
      method, // HTTP method (e.g., GET, POST)
      url, // API endpoint
      data, // Request body data
      headers, // Custom headers (e.g., Authorization)
      params, // Query parameters (for GET requests)
    });

    return response; // Return the successful response
  } catch (error) {
    // Log error details for debugging
    console.error(
      "API Connector Error:",
      error?.response?.data || error.message,
    );

    // Throw a meaningful error message
    throw new Error(
      error?.response?.data?.message ||
        "Something went wrong with the API request",
    );
  }
};
