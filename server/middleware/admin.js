// Runs after auth. Only an admin may add or delete a job.
function adminOnly(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admin can add or delete jobs' });
  }
  next();
}

module.exports = adminOnly;
