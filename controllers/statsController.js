const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

exports.getDashboardStats = async (req, res) => {
  try {
    const [employers, candidates, totalJobs, applications] = await Promise.all([
      User.countDocuments({ role: 'employer' }),
      User.countDocuments({ role: 'candidate' }),
      Job.countDocuments(),
      Application.countDocuments(),
    ]);

    res.json({ employers, candidates, jobs: totalJobs, applications });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};
