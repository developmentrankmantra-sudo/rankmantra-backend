import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    selectedCourse: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true } // auto adds createdAt, updatedAt
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
