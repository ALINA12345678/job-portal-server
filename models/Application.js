const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  resume: {
    type: Object, // Or define schema if structured
    default: null,
  },
  resumePDF: {
    type: String, // URL or base64 string (depends on your storage setup)
    default: null,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  }
});

applicationSchema.index({ jobId: 1, applicant: 1 }, { unique: true }); // prevent duplicate applications

module.exports = mongoose.model('Application', applicationSchema);
