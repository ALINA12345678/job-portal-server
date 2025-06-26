const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    // console.error("No Authorization header");
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Expecting: "Bearer <token>"

  if (!token) {
    // console.error(" Invalid token format");
    return res.status(401).json({ message: 'Invalid token format' });
  }

  try {
    // console.log(" Incoming token:", token);
    // console.log(" Secret used:", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded token:", decoded);

    req.user = decoded;
    next();
  } catch (err) {
    // console.error(" JWT verification failed:", err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
