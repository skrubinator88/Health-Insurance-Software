const { postHealthPlan } = require('../Controllers/posts');

module.exports = async function (req, res, next) {
    let invoiceInfo = {
        name: req.body.name,
        type: req.body.type,
        deductible: req.body.deductible,
        description: req.body.description,
        ProviderId: req.userId
    };
    await postHealthPlan(invoiceInfo, function(err, healthPlan) {
        if(err) {
            return next(err);
        }
        res.status(200).send(healthPlan)
    })
};