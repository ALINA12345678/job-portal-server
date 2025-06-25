const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const exists = await User.findOne({ email });

        if (exists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ name, email, password, role });
        res.status(201).json({
            message: 'Registered successfully',
            name: user.name  // send name back
        });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // ✅ Include name in JWT payload
        const token = jwt.sign(
            { id: user._id, name: user.name, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, user: { name: user.name, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


exports.getUsersByRole = async (req, res) => {
  try {
    const role = req.query.role;
    if (!role) return res.status(400).json({ message: 'Role is required' });
    

    const users = await User.find({ role }).select('-password'); // exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users', error: err.message });
  }
};
