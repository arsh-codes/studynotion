// Import necessary modules and functions
import { apiConnector } from "@services/apiConnector"; // Function to make API requests
import { checkConnectionEndpoint } from "@services/apis"; // API endpoint for connection check
import { setIsConnected } from "@client/redux/slices/connectionSlice"; // Redux action to update connection state

// Destructure the connection API endpoint
const { CHECK_CONNECTION_API } = checkConnectionEndpoint;

// Function to check backend connection
export function checkConnection() {
  return async (dispatch) => {
    try {
      // Make a GET request to check if the backend is reachable
      const response = await apiConnector("GET", CHECK_CONNECTION_API);

      // If the API response indicates failure, throw an error
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Dispatch action to update Redux state: connection is active
      dispatch(setIsConnected(true));
    } catch (error) {
      // Log error message if unable to connect to backend
      console.log("Unable to connect to backend:", error.message);

      // Dispatch action to update Redux state: connection is inactive
      dispatch(setIsConnected(false));
    }
  };
}
