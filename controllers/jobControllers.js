const Job = require('../models/Job');

// Create a new job
exports.createJob = async (req, res) => {
    try {
        const {
            id, // 👈 custom job ID from frontend
            title,
            company,
            location,
            type,
            description,
            skills,
            deadline,
            salary,
            applicationLink
        } = req.body;

        const postedBy = req.user?.name || 'anonymous';

        const newJob = new Job({
            id, // 👈 include custom ID here
            title,
            company,
            location,
            type,
            description,
            skills,
            deadline,
            salary,
            applicationLink,
            postedBy
        });

        await newJob.save();
        res.status(201).json({ message: 'Job posted successfully', job: newJob });
    } catch (err) {
        res.status(500).json({ message: 'Failed to post job', error: err.message });
    }
};

// Get all jobs
exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch jobs', error: err.message });
    }
};
//delete job by id

exports.deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const deletedJob = await Job.findOneAndDelete({ id: jobId });

    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete job', error: err.message });
  }
};

exports.markJobAsFeatured = async (req, res) => {
  try {
    // Optional: double-check employer role if not in middleware
    if (req.user.role !== 'employer') {
      return res.status(403).json({ message: "Only employers can feature jobs" });
    }

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.isFeatured) {
      return res.status(400).json({ message: "Job is already featured" });
    }

    job.isFeatured = true;
    const updated = await job.save();

    res.json({ message: "Job marked as featured", job: updated });
  } catch (err) {
    console.error(" Error marking job as featured:", err.message);
    res.status(500).json({ message: "Failed to mark job as featured" });
  }
};

