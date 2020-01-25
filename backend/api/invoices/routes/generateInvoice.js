const { generateInvoice } = require('../Controllers/posts');

module.exports = async function (req, res, next) {
    let patientInfo = {
        PatientId: req.body.PatientId,
        items: req.body.items,
        opts: req.body.opts
    };
    if(req.body.items.length < 1) {
        return res.status(400).send({error: 'Can not generate invoice without items'})
    }
    await generateInvoice(patientInfo, function(err, url) {
        if(err) {
            return next(err);
        }
        res.status(200).send(url)
    })
};