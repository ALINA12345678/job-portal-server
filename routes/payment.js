// const express = require("express");
// const Razorpay = require("razorpay");
// const authMiddleware = require("../Middleware1/jwtMiddleware"); 
// const Job = require("../models/Job"); // adjust path if needed

// const router = express.Router();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// // Anyone can create order (optional: add auth here too)
// router.post('/create-order', authMiddleware, async (req, res) => {
//   try {
//     const order = await razorpay.orders.create({
//       amount: 19900,
//       currency: "INR",
//       receipt: `feat-${Date.now()}`
//     });
//     res.json(order);
//   } catch (err) {
//     res.status(500).send("Payment failed");
//   }
// });

// // Only logged-in employers can mark job as featured
// router.post('/mark-featured', authMiddleware, async (req, res) => {
//   const { jobId } = req.body;
//   const user = req.user; // comes from auth middleware

//   if (user.role !== 'employer') {
//     return res.status(403).json({ message: "Only employers can feature jobs" });
//   }

//   try {
//     await Job.findByIdAndUpdate(jobId, { isFeatured: true });
//     res.json({ success: true });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to update job" });
//   }
// });

// module.exports = router;
