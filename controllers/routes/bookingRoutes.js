import express from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import {
  createBooking,
  getBookings,
  getBookingById,
  deleteBookingById,
} from "../controllers/bookingController.js";

const router = express.Router();

// Create a new booking
// POST /api/booking
router.post("/booking-create", asyncHandler(createBooking));

// Get all bookings
// GET /api/booking
router.get("/booking", asyncHandler(getBookings));

// Get a single booking by ID
// GET /api/booking/:id
router.get("/booking/:id", asyncHandler(getBookingById));

// Delete a single booking by ID
// DELETE /api/booking/:id
router.delete("/booking/:id", asyncHandler(deleteBookingById));

export default router;
