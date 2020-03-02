const { getInvoiceById } = require('../Controllers/queries');

module.exports = async function (req, res, next) {
    await getInvoiceById(req.params.invoiceId, function(err, invoice) {
        if(err) {
            return next(err);
        }
        res.status(200).send(invoice)
    })
};