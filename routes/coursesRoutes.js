import express from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import upload from "../middleware/courses/upload.js";

import {
  createCourse,
  getCourses,
  getCourseBySlug,
  updateCourseById,
  deleteCourseById,
} from "../controllers/courseController.js";

const router = express.Router();

// CREATE
router.post(
  "/create-courses",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "curriculum", maxCount: 1 },
  ]),
  asyncHandler(createCourse)
);

// GET ALL
router.get("/courses", asyncHandler(getCourses));

// GET BY SLUG
router.get("/courses/slug/:slug", asyncHandler(getCourseBySlug));



// UPDATE BY ID
router.put(
  "/courses/:id",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "curriculum", maxCount: 1 },
  ]),
  asyncHandler(updateCourseById)
);

// DELETE BY ID
router.delete("/courses/:id", asyncHandler(deleteCourseById));

export default router;
