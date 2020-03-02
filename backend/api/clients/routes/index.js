//index manifest file for all profile routes
const express = require('express');
const authMiddleware = require('../../Helpers/authMiddleware');
const router = express.Router();

router.get('/:clientId/invoices',  require('./getInvoices'));
router.get('/:clientId/claims', authMiddleware, require('./getClaims'));

router.get('/',  require('./getAllClients'));
router.get('/:patientId',  require('./getPatient'));
router.post('/new', authMiddleware, require('./newClient'));
module.exports = router;