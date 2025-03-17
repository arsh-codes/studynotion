import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL, // Correct way to access env variables in Vite
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
 * @returns {Promise<object>} - Returns the API response or error response
 */
export const apiConnector = async (
  method,
  url,
  data = {},
  headers = {},
  params = {},
) => {
  try {
    console.log("API connector request details:", {
      method,
      url,
      data,
      headers,
      params,
    });

    // Make the API request using the Axios instance
    const response = await axiosInstance({
      method,
      url,
      data,
      params,
      headers: {
        ...axiosInstance.defaults.headers.common, // Preserve default headers
        ...headers, // Merge custom headers
      },
    });

    return response; // Return successful response
  } catch (error) {
    console.error(
      "API Connector Error:",
      error?.response?.data || error.message,
    );

    // If error has response, return it instead of throwing
    if (error.response) {
      return error.response; // Allows handling 404 or other errors properly
    }

    // Return a generic error object for unexpected failures
    return {
      status: error.response?.status || 500,
      data: {
        success: false,
        message:
          error.response?.data?.message || error.message || "Network error",
      },
    };
  }
};
