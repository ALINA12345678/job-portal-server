const express = require("express");
const Razorpay = require("razorpay");
const authMiddleware = require("../Middleware1/jwtMiddleware");
const Job = require("../models/Job");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ✅ Create payment order
router.post('/create-order', authMiddleware, async (req, res) => {
  try {
    const { amount = 19900 } = req.body;

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `feat-${Date.now()}`
    });

    res.json(order);
  } catch (err) {
    console.error("Razorpay error:", err);
    res.status(500).json({ message: "Payment creation failed", error: err.message });
  }
});

// ✅ Mark job as featured (post-payment)
router.post('/mark-featured', authMiddleware, async (req, res) => {
  const { jobId } = req.body;
  const user = req.user;

  if (user.role !== 'employer') {
    return res.status(403).json({ message: "Only employers can feature jobs" });
  }

  try {
    await Job.findByIdAndUpdate(jobId, { isFeatured: true });
    res.json({ success: true, message: "Job marked as featured" });
  } catch (err) {
    console.error("Feature update failed:", err);
    res.status(500).json({ message: "Failed to update job", error: err.message });
  }
});

module.exports = router;
