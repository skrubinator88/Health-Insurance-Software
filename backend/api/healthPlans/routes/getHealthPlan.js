const { getHealthPlan }     = require('../Controllers/queries');

module.exports = async function (req, res, next) {
    await getHealthPlan(req.params.id, function(err, healthPlan) {
        if(err) {
            return next(err);
        }
        res.status(200).send(healthPlan)
    })
};
