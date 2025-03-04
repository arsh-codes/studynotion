import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

// Initial state for the cart
const initialState = {
  // Retrieve cart data from localStorage if available, otherwise set it as an empty array
  cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
  // Retrieve total price from localStorage, default to 0
  total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
  // Retrieve total number of items from localStorage, default to 0
  totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
};

// Creating a cart slice using Redux Toolkit
const cartSlice = createSlice({
  name: "cart", // Slice name
  initialState, // Initial state object
  reducers: {
    // Action to add a course to the cart
    addToCart: (state, action) => {
      const course = action.payload;
      const index = state.cart.findIndex((item) => item._id === course._id);

      if (index >= 0) {
        // If the course is already in the cart, show an error toast and return
        toast.error("Course already in cart");
        return;
      }
      // Add the course to the cart if it's not already present
      state.cart.push(course);
      // Update the total item count and total price
      state.totalItems++;
      state.total += course.price;
      // Store updated cart data in localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      // Show success toast notification
      toast.success("Course added to cart");
    },
    
    // Action to remove a course from the cart
    removeFromCart: (state, action) => {
      const courseId = action.payload;
      const index = state.cart.findIndex((item) => item._id === courseId);

      if (index >= 0) {
        // If the course is found, remove it from the cart
        state.totalItems--;
        state.total -= state.cart[index].price;
        state.cart.splice(index, 1);
        // Update localStorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
        // Show success toast notification
        toast.success("Course removed from cart");
      }
    },
    
    // Action to reset the cart (empty it completely)
    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;
      // Remove cart data from localStorage
      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");
    },
  },
});

// Exporting actions for use in components and thunks
export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;

// Exporting the reducer to be included in the store
export default cartSlice.reducer;