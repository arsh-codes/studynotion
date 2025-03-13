import { checkConnection } from "../controllers/ConnectionController.js";
import express from "express";

const router = express.Router();

// Route to check backend connection
router.get("/connection", checkConnection);

export default router;
