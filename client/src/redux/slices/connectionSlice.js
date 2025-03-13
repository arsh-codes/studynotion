import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnected: false,
};

const connectionSlice = createSlice({
  name: "connection", 
  initialState,
  reducers: {
    setIsConnected(state, { payload }) {
      state.isConnected = payload;
    },
  },
});

// Export actions
export const { setIsConnected } = connectionSlice.actions;

// Export reducer for store setup
export default connectionSlice.reducer;
