const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  id: { type: String, required: true }, // 👈 Add this to store timestamp-based job ID
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: String,
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Internship', 'Freelance'],
    default: 'Full-time'
  },
  description: { type: String, required: true },
  skills: [String],
  deadline: Date,
  salary: String,
  applicationLink: String,
  postedBy: { type: String, required: true }, // or ObjectId if you prefer
  createdAt: { type: Date, default: Date.now },
  isFeatured: {
  type: Boolean,
  default: false,
},

});

module.exports = mongoose.model('Job', jobSchema);
