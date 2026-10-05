const mongoose = require('mongoose');

// Collection name in MongoDB will be "users"
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // student applies for jobs. admin adds and deletes jobs.
  role: { type: String, default: 'student' }
});

module.exports = mongoose.model('User', userSchema);
