import Booking from "../models/Booking.js";
import { sendBookingEmail } from "../utils/sendEmail.js";

// @desc    Create a new booking
// @route   POST /api/booking
// @access  Public
export const createBooking = async (req, res) => {
  const { fullName, phoneNumber, selectedCourse } = req.body;

  // Validate required fields
  if (!fullName || !phoneNumber || !selectedCourse) {
    return res
      .status(400)
      .json({ error: "fullName, phoneNumber, and selectedCourse are required" });
  }

  const booking = await Booking.create({
    fullName,
    phoneNumber,
    selectedCourse,
  });

  if (booking) {
    await sendBookingEmail(req.body);
  }

  res.status(201).json({ message: "Booking created successfully", booking });
};

// @desc    Get all bookings
// @route   GET /api/booking
// @access  Admin
export const getBookings = async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.status(200).json(bookings);
};

// @desc    Get a single booking by ID
// @route   GET /api/booking/:id
// @access  Admin
export const getBookingById = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({ error: "Booking not found" });
  }
  res.status(200).json(booking);
};

// @desc    Delete a booking by ID
// @route   DELETE /api/booking/:id
// @access  Admin
export const deleteBookingById = async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) {
    return res.status(404).json({ error: "Booking not found" });
  }
  res.status(200).json({ message: "Booking deleted successfully" });
};
