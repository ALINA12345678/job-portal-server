const { default: mongoose } = require('mongoose');
const Application = require('../models/Application');
const Job = require('../models/Job');


exports.applyToJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { name, resume, resumePDF } = req.body;

        const applicantId = req.user?.id;
       


        if (!applicantId || !name || (!resume && !resumePDF)) {
            return res.status(400).json({ message: "Incomplete application data" });
        }

        // Check for duplicate applications by jobId + applicant
        const existing = await Application.findOne({ jobId, applicant: applicantId });

        if (existing) {
            
            return res.status(409).json({ message: "You have already applied to this job." });
            
            // ✅ EARLY RETURN
        }

        else {
            

            const newApp = new Application({
                jobId,
                applicant: applicantId,
                name,
                resume: resume || null,
                resumePDF: resumePDF || null,
                appliedAt: new Date()
            });

            await newApp.save();
            res.status(200).json({ message: "Application submitted successfully" });
        }

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "You have already applied to this job." });
        }
        console.error("Application error:", error);
        res.status(500).json({ message: "Server error while applying to job." });
    }

};
exports.getApplicationsForJob = async (req, res) => {
    try {
        const { jobId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ message: "Invalid Job ID" });
        }

        const applications = await Application.find({ jobId })
            .populate('applicant', 'name email')
            .populate('jobId', 'title company');

        res.status(200).json(applications);
    } catch (error) {
        console.error("Error fetching applications for job:", error);
        res.status(500).json({ message: "Failed to fetch applications" });
    }
};




exports.getApplicationsForCurrentUser = async (req, res) => {
  try {
    const role = req.user?.role;
    const userId = req.user?.id;
    const userName = req.user?.name;

    let applications = [];

    if (role === 'candidate') {
      // Get apps by the logged-in applicant
      applications = await Application.find({ applicant: userId })
        .populate('jobId', 'title company postedBy');
    } else if (role === 'employer') {
      // Get jobs posted by this employer
      const jobs = await Job.find({ postedBy: userName }, '_id');
      const jobIds = jobs.map(job => job._id);

      applications = await Application.find({ jobId: { $in: jobIds } })
        .populate('jobId', 'title company postedBy')
        .populate('applicant', 'name email');
    } else if (role === 'admin') {
      // Get all applications
      applications = await Application.find()
        .populate('jobId', 'title company postedBy')
        .populate('applicant', 'name email');
    } else {
      return res.status(403).json({ message: 'Unauthorized role' });
    }

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};
