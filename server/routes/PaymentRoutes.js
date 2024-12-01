// Import the required modules
const express = require("express");
const router = express.Router();

// Import Payment Controllers
const {
    capturePayment,
    verifySignature,
} = require("../controllers/PaymentControllers");

// Import Middlewares
const {
    auth,
    isStudent,
} = require("../middlewares/authorizationMiddleware");

// ********************************************************************************************************
//                                      Payment routes
// ********************************************************************************************************

// Capture payment (accessible only to students)
router.post("/capturePayment", auth, isStudent, capturePayment); 

// Verify payment signature (no authentication required for this action)
router.post("/verifySignature", verifySignature); 
 
module.exports = router;
