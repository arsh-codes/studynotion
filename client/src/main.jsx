import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { reduxStore } from "./redux/reduxStore.js";
import { Provider } from "react-redux";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={reduxStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
