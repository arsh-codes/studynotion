import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@redux/reducer/rootReducer";

export const reduxStore = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production", // Enables Redux DevTools in development mode
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable state check if using non-serializable values
    }),
});

export default reduxStore;
