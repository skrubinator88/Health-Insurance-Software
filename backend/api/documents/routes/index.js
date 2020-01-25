const express = require('express');
const router = express.Router();
const authMiddleware = require('../../Helpers/authMiddleware');

router.get('/:documentId', authMiddleware, require('./getDocument'));
router.patch('/:documentId', authMiddleware, require('./updateDocument'));
router.get('/', authMiddleware, require('./getDocuments'));
router.post('/new', authMiddleware, require('../../patients/routes/newDocument'));
module.exports = router;