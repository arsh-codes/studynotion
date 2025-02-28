import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
      localStorage.setItem("totalItems", JSON.stringify(action.payload));
      toast.success("Cart updated successfully");
      //add to cart
      //remove from cart
      //reset cart
    
    },
  },
});

export const { setTotalItems } = cartSlice.actions;
export default createSlice.reducer;
