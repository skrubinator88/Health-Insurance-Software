'use strict';
const dbmain = require('../../../config/DB/DBmain');
const uuidv4 = require('uuid/v4');

module.exports = {
    async postInvoice(info, cb) {
        try {
            let Invoice = dbmain.model("Invoice");
            let invoice = await Invoice.create({
                id: uuidv4(),
                PatientId: info.PatientId,
                invoiceStreet1: info.opts.address,
                invoiceNo: await generateInvoiceNo(info.PatientId),
                salesTax: 0.06,
                status: info.opts.status,
                date: new Date(),
                salesman: info.opts.salesman,
                url: info.url
            });
            cb(null, invoice)
        } catch(err) {
            cb(err);
        }
    }
};