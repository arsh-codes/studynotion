// Importing the Razorpay module. In TypeScript, use 'import' for ES module imports.
// The 'import Razorpay from "razorpay"' syntax is preferred when using default exports.
import Razorpay from "razorpay"; // changed: using ES6 default import instead of 'require'

// Check if Razorpay keys are missing from environment variables and throw an error if they are.
// TypeScript benefits from strict null checks, so it's important to validate these values.
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET_KEY) {
    // changed: no syntax change, but TypeScript ensures that `process.env` is checked for undefined values.
    throw new Error("Razorpay keys are missing from environment variables");
}

// Initialize Razorpay instance with environment variables.
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, // changed: 'process.env.RAZORPAY_KEY_ID' is implicitly of type 'string | undefined', so no direct change here unless you want to cast explicitly
    key_secret: process.env.RAZORPAY_SECRET_KEY, // changed: similarly, 'process.env.RAZORPAY_SECRET_KEY' could be type casted explicitly as 'string'
});
