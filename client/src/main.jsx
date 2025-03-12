// Import global styles
import "@client/index.css";

import App from "@client/App.jsx";
// Import BrowserRouter for client-side routing
import { BrowserRouter } from "react-router-dom";
// Import Provider from react-redux to enable Redux store access in the app
import { Provider } from "react-redux";
// Import StrictMode to highlight potential issues in development mode
import { StrictMode } from "react";
// Import createRoot for rendering the React app
import { createRoot } from "react-dom/client";
// Import the configured Redux store
import { reduxStore } from "./redux/reduxStore.js";

// Select the root DOM element and render the React app inside it
createRoot(document.getElementById("root")).render(
  // StrictMode helps with identifying potential problems in React components
  <StrictMode>
    {/* Provider makes the Redux store available to all components */}
    <Provider store={reduxStore}>
      {/* BrowserRouter enables navigation within the React app */}
      <BrowserRouter>
        {/* Render the main application component */}
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
