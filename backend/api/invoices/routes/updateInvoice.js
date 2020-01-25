'use strict';
const { updateInvoice } = require('../Controllers/updates');

/*req.body: items, opts, (optional) file*/
module.exports = async function (req, res, next) {
    let invoiceId = req.params.invoiceId;
    let invoiceInfo = {
        items: req.body.items,
        opts: req.body.opts
    };
    await updateInvoice(invoiceInfo, invoiceId, function(err) {
        if(err) return next(err);
        res.status(200).send({success: 'updated successfully'})
    });
};