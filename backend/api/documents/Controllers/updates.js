'use strict';

const dbmain = require('../../../config/DB/DBmain');

module.exports = {
    async deleteInvoice (opts, cb) {
        let Invoice = dbmain.model('Invoice');
        try {
            let infoObject = {
                id: opts.id
            };
            await Invoice.destroy({
                where: infoObject
            });
            cb(null, true);
        } catch (err) {
            console.error(err);
            cb(err);
        }
    },
    async updateInvoice (opts, id, cb) {
        let Invoice = dbmain.model('Invoice');
        try {
            console.log(opts);
            Invoice.update(
               opts, { returning: true, where: { id: id } }
            ).then(async function([rowsUpdated, [invoiceUpdated]]) {
                if(!invoiceUpdated)
                    return cb(null, false);
                return cb(null, true)
            })
        } catch (err) {
            console.error(err);
            cb(err);
        }
    }
};