const express = require('express');
const router = express.Router();
const authMiddleware = require('../../Helpers/authMiddleware');

router.get('/:invoiceId', authMiddleware, require('./getInvoice'));
router.patch('/:invoiceId', authMiddleware, require('./updateInvoice'));
router.get('/', authMiddleware, require('./getInvoices'));
router.post('/generate', authMiddleware, require('./generateInvoice'));
router.post('/new', authMiddleware, require('./newInvoice'));
module.exports = router;