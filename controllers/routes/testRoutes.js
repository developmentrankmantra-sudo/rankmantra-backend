import express from "express";
import { getTest, postTest } from "../controllers/testController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = express.Router();

// Wrap all async routes with asyncHandler
router.get("/test-get", asyncHandler(getTest));
router.post("/test-post", asyncHandler(postTest));

export default router;
