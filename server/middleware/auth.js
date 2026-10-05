const jwt = require('jsonwebtoken');

// Protects routes that need a logged-in user (add job, delete job).
function auth(req, res, next) {
  const header = req.headers.authorization;

  // Frontend sends: Authorization: Bearer <token>
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Please login first' });
  }

  const token = header.split(' ')[1];

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = auth;
