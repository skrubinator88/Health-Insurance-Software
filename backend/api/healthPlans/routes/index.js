const express = require('express');
const router = express.Router();
const authMiddleware = require('../../Helpers/authMiddleware');

router.get('/:id', authMiddleware, require('./getHealthPlan'));
router.patch('/:id', authMiddleware, require('./updateHealthPlan'));
router.get('/', authMiddleware, require('./getHealthPlans'));
router.post('/', require('./newHealthPlan'));
module.exports = router;
