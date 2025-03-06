import { auth, isStudent } from "../middlewares/authorizationMiddleware.js";
import {
    capturePayment,
    verifySignature,
} from "../controllers/PaymentControllers.js";

// Import required modules
import express from "express";

// Create an Express router
const router = express.Router();

// ********************************************************************
//                           Payment Routes
// ********************************************************************

// 1. Capture payment (Only students can make payments)
router.post("/capturePayment", auth, isStudent, capturePayment);

// 2. Verify payment signature (No authentication required)
router.post("/verifySignature", verifySignature);

// Export the router
export default router;
