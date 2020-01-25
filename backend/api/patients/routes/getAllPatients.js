'use strict';
const { getAllPatients } = require('../Controllers/queries');
module.exports = async function (req, res, next) {
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
        query: {}
    };
    if (req.query.search) {
            infoObject.query['$or'] = {
                name : {
                    ["$iLike"]: `%${req.query.search}%`
                }
            }
    }
    await getAllPatients(infoObject, function(err, patients) {
        if(err)
            return next(err);
        //returns an object with count and rows values
        return res.status(200).send(patients);
    });
};