//index manifest file for all profile routes
const express = require('express');
const router = express.Router();
const authMiddleware = require('../../Helpers/authMiddleware');

router.post("/new", require('./new'));
router.post('/login', require('./login'));
router.get('/healthPlans', authMiddleware, require('./getHealthPlans'));

module.exports = router;
