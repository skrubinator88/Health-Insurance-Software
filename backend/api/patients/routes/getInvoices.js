'use strict';
const { getInvoices } = require('../Controllers/queries');
module.exports = async function (req, res, next) {
    let patientId = req.params.patientId;
    if (!(req.query.pageNo || req.query.pageLimit)) return res.status(400).send({ error: 'pageNo or pageLimit not specified'});
    let pageLimit = parseInt(req.query.pageLimit);
    let pageNumber = (parseInt(req.query.pageNo) - 1) * pageLimit;
    if (Number.isNaN(pageNumber) || Number.isNaN(pageLimit)) return res.status(400).send({ error: 'pageNo and pageLimit must both be numbers'});
    let infoObject = {
        page: pageNumber,
        pageSize: pageLimit,
        query: { PatientId: patientId }
    };
    await getInvoices( infoObject, (err, invoices) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        res.status(200).send(invoices);
    })
};