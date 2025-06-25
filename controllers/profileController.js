const Profile = require('../models/profile');

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: "No profile found." });
    }
    res.status(200).json(profile);
  } catch (err) {
    console.error("GET /profile error:", err);
    res.status(500).json({ message: "Failed to load profile" });
  }
};

exports.saveOrUpdateProfile = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user.id;

    const updated = await Profile.findOneAndUpdate(
      { user: userId },
      { ...data, user: userId },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ message: "Profile saved", profile: updated });
  } catch (err) {
    console.error("POST /profile error:", err);
    res.status(500).json({ message: "Failed to save profile" });
  }
};
