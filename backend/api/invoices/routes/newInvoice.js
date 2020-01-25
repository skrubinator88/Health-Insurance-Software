const { postInvoice } = require('../Controllers/posts');

module.exports = async function (req, res, next) {
    let invoiceInfo = {
        PatientId: req.body.PatientId,
        items: req.body.items,
        opts: req.body.opts,
        url: req.body.url
    };
    await postInvoice(invoiceInfo, function(err, invoice) {
        if(err) {
            return next(err);
        }
        res.status(200).send(invoice)
    })
};