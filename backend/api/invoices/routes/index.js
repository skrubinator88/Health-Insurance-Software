const express = require('express');
const router = express.Router();
const authMiddleware = require('../../Helpers/authMiddleware');

router.get('/:invoiceId', authMiddleware, require('./getInvoice'));
router.get('/', authMiddleware, require('./getInvoices'));
router.post('/new', authMiddleware, require('./newInvoice'));
module.exports = router;