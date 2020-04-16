'use strict';
const { updateHealthPlan } = require('../Controllers/updates');

/*req.body: items, opts, (optional) file*/
module.exports = async function (req, res, next) {
    let healthPlanId = req.params.id;
    await updateHealthPlan(req.body, healthPlanId, function(err) {
        if(err) return next(err);
        res.status(200).send({success: 'updated successfully'})
    });
};
