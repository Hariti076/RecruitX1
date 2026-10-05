const express = require('express');
const { getJobs, addJob, deleteJob } = require('../controllers/jobController');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/admin');

const router = express.Router();

router.get('/', getJobs);
router.post('/', auth, adminOnly, addJob);
router.delete('/:id', auth, adminOnly, deleteJob);

module.exports = router;
