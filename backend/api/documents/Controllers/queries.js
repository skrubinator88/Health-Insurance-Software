'use strict';

const dbmain = require('../../../config/DB/DBmain');

module.exports = {
    async getAllDocuments (page, limit, query, cb) {
        let Invoice = dbmain.model('Invoice');
        let options = {
            where: query || {},
            limit: limit,
            offset: page
        };
        try {
            let response = [];
            let documents = await Invoice.findAll(options);
            response = documents.map(invoice => {
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
    async getDocumentById (id, cb) {
        let Document = dbmain.model('Document');
        try {
            let document = await Document.findById(id);
            cb(null, document)
        } catch(err) {
            console.error(err);
        }
    }
};