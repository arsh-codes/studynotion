import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Correct way to access env variables in Vite
  timeout: 10000,
});

/**
 * API Connector function to make HTTP requests using Axios
 *
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param {string} url - API endpoint URL
 * @param {object} [data={}] - Request body data (for POST, PUT, etc.)
 * @param {object} [headers={}] - Custom headers for the request
 * @param {object} [params={}] - Query parameters for GET requests
 * @returns {Promise<object>} - Returns the API response
 * @throws {Error} - Throws an error if the request fails
 */
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
