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

