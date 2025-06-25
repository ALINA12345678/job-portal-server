const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true
  },
  name: String,
  email: String,
  education: String,
  experience: String,
  skills: String,
});

module.exports = mongoose.model('Profile', profileSchema);
