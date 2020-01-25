'use strict';

const dbmain = require('../../../config/DB/DBmain');

module.exports = {
    async getAllInvoices (page, limit, query, cb) {
        let Invoice = dbmain.model('Invoice');
        let options = {
            where: query || {},
            limit: limit,
            offset: page
        };
        try {
            let response = [];
            let invoices = await Invoice.findAll(options);
            response = invoices.map(invoice => {
                return {
                    id: invoice.id,
                    name: invoice.name,
                    amount: invoice.amount,
                    price: invoice.price
                };
            });
            return cb(null, response);
        } catch(err) {
            console.error(err);
            cb(err);
        }
    },
    async getInvoiceById (id, cb) {
        let Invoice = dbmain.model('Invoice');
        let Item = dbmain.model('Item');
        try {
            let invoice = await Invoice.findById(id);
            let items = await Item.findAll({ where: { InvoiceId: id } });
            cb(null, Object.assign({}, invoice.get(), {items: items}))
        } catch(err) {
            console.error(err);
        }
    }
};