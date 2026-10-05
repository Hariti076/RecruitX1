const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/register
async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password before saving. Plain text is never stored.
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role: 'student' });

    res.status(201).json({
      message: 'Registered successfully',
      user: { id: user._id, name: user.name, email: user.email, role: 'student' }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

// POST /api/login
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const role = user.role || 'student';

    // JWT is a signed token. The React app stores it and sends it later.
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email, role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email, role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { register, login };
