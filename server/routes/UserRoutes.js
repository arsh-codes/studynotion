const express = require("express");
const router = express.Router();

const { signUp, logIn } = require("../controllers/AuthenticationController");
const { auth } = require("../middlewares/authenticate");
const { isStudent, isAdmin, isInstructor } = require("../middlewares/authorization");

// Public routes
router.get("/login", logIn);
router.post("/signup", signUp);

// Protected routes with role-based authorization
router.get("/student", auth, isStudent, (req, res) => {
    res.json({ success: true, message: "Student Dashboard" });
});

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({ success: true, message: "Admin Dashboard" });
});

router.get("/instructor", auth, isInstructor, (req, res) => {
    res.json({ success: true, message: "Instructor Dashboard" });
});

module.exports = router;
