import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/rootReducer";

export const reduxStore = configureStore({
  reducer: rootReducer,
});
