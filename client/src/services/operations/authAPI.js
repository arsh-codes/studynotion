import { apiConnector } from "../apiConnector";
import { LOGIN_API } from "../apiRoutes"; // Assuming LOGIN_API is defined in apiRoutes

export function login(email, password, navigate) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });
      console.log("Login API response:", response);

      if (!response.data.success) {
        throw new Error(response.data.message || "Login failed");
      }

      // Dispatch action to update state (if needed)
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });

      // Redirect user after successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.message);

      // Dispatch action for login failure (if needed)
      dispatch({ type: "LOGIN_FAILURE", payload: error.message });
    }
  };
}
