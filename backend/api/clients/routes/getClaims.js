'use strict';
const { getDocuments: getClaims } = require('../Controllers/queries');
module.exports = async function (req, res, next) {
    let patientId = req.params.patientId;
    if (!(req.query.pageNo || req.query.pageLimit)) {
        res.status(400).send({
            error: 'pageNo or pageLimit not specified'
        });
        return;
    }
    let pageLimit = parseInt(req.query.pageLimit);
    let pageNumber = (parseInt(req.query.pageNo) - 1) * pageLimit;
    if (Number.isNaN(pageNumber) || Number.isNaN(pageLimit)) {
        res.status(400).send({
            error: 'pageNo and pageLimit must both be numbers'
        });
        return;
    }
    let infoObject = {
        page: pageNumber,
        pageSize: pageLimit,
        query: { PatientId: patientId }
    };
    await getClaims( infoObject, (err, documents) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        res.status(200).send(documents);
    })
};