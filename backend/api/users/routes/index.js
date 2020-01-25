//index manifest file for all profile routes
const express = require('express');
const router = express.Router();
const authMiddleware = require('../../Helpers/authMiddleware')

router.post("/new", require('./new'));
router.post('/login', require('./login'));
router.get('/', authMiddleware, require('./getUsers'));
router.patch('/:userId', authMiddleware, require('./updateUser'));
router.get('/:userId', authMiddleware, require('./getUser'));
router.delete('/:userId', authMiddleware, require('./deleteUser'));

module.exports = router;
