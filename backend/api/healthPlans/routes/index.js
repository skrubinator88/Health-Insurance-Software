const express = require('express');
const router = express.Router();
const authMiddleware = require('../../Helpers/authMiddleware');

router.get('/:id', authMiddleware, require('./getHealthPlan'));
router.get('/', authMiddleware, require('./getHealthPlans'));
router.post('/', authMiddleware, require('./newHealthPlan'));
module.exports = router;