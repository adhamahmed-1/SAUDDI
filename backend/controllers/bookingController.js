const Booking = require("../models/Booking");
const generateBookingId = require("../utils/generateBookingId");

// CREATE BOOKING
exports.createBooking = async (req, res) => {
  try {
    const { name, email, phone, packageName, amount } = req.body;

    if (!name || !email || !phone || !packageName || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const booking = await Booking.create({
      bookingId: generateBookingId(),
      name,
      email,
      phone,
      packageName,
      amount
    });

    res.status(201).json({
      success: true,
      bookingId: booking.bookingId,
      message: "Booking created successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BOOKING STATUS
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      bookingId: req.params.id
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      bookingId: booking.bookingId,
      status: booking.status,
      packageName: booking.packageName,
      amount: booking.amount,
      createdAt: booking.createdAt
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
