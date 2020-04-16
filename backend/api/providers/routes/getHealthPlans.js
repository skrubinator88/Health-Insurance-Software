'use strict';
const { getHealthPlans } = require('../Controllers/queries');
const { validateQuery } = require('../../Actions/routeActions');
module.exports = async function (req, res, next) {
    let {pageLimit, pageNo } = validateQuery(req.query);
    let query = {};
    if (req.query.search) {
        query['$or'] = {
            name : {
                ["$iLike"]: `%${req.query.search}%`
            }
        }
    }
    await getHealthPlans(pageNo, pageLimit, query, function(err, healthPlans) {
        if(err)
            return next(err);
        console.log(healthPlans)
        res.status(200).json(healthPlans);
    })
};
