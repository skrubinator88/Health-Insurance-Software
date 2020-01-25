//index manifest file for all profile routes
const express = require('express');
const authMiddleware = require('../../Helpers/authMiddleware');
const router = express.Router();

router.get('/:patientId/invoices',  require('./getInvoices'));
router.get('/:patientId/documents', authMiddleware, require('./getDocuments'));

router.get('/',  require('./getAllPatients'));
router.get('/:patientId',  require('./getPatient'));
router.post('/new', authMiddleware, require('./newPatient'));
router.post('/:patientId/newDocument', authMiddleware, require('./newDocument'));
router.patch('/:patientId', authMiddleware, require('./updatePatient'));
module.exports = router;