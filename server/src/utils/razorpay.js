import Razorpay from "razorpay";

// Initialize Razorpay instance using environment variables
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, // Razorpay API Key
    key_secret: process.env.RAZORPAY_SECRET_KEY, // Razorpay Secret Key
});
