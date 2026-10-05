const express = require('express');
const auth = require('../middleware/auth');
const { applyForJob, getMyApplications } = require('../controllers/applicationController');

const router = express.Router();

router.post('/applications', auth, applyForJob);
router.get('/applications', auth, getMyApplications);

module.exports = router;
