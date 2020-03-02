'use strict';
const dbmain = require('../../../config/DB/DBmain');
module.exports = {
    async getAllPatients (opts, cb) {
        let Patient = dbmain.model('Patient');
        let options = {
            where: opts.query || {},
            limit: opts.pageSize,
            offset: opts.page,
            order: [
                ['name', 'ASC']
            ]
        };
        try {
            let patients = await Patient.findAndCountAll(options);
            return cb(null, patients);
        } catch(err) {
            console.error(err);
            return cb(err);
        }
    },
    async getPatientById (id, cb) {
        let Patient = dbmain.model('Patient');
        try{
            let patient = await Patient.findById(id);
            return cb(null, patient);
        } catch(err) {
            console.error(err);
            return cb(err);
        }
    },
    async getInvoices(opts, cb) {
        const Invoice = dbmain.model('Invoice');
        const Item = dbmain.model('Item');
        let options = {
            where: opts.query || {},
            limit: opts.pageSize,
            offset: opts.page,
            order: [
                ['invoiceNo', 'DESC']
            ],
            attributes: ['id', 'invoiceNo', 'salesman', 'date', 'status']
        };
        try {
            let invoices = await Invoice.findAndCountAll(options);
            invoices.rows = await Promise.all( await invoices.rows.map(async invoice => {
                let items = await Item.findAll({ where: { InvoiceId: invoice.id } });
                return {
                    id: invoice.id,
                    invoiceNo: invoice.invoiceNo,
                    salesman: invoice.salesman,
                    date: invoice.date,
                    status: invoice.status,
                    items: items
                }
            }));
            cb(null, invoices);
        } catch (err) {
            console.log(err);
            cb(err)
        }
    },
    async getDocuments(opts, cb) {
        const Document = dbmain.model('Document');
        let options = {
            where: opts.query || {},
            limit: opts.pageSize,
            offset: opts.page,
            order: [
                ['createdAt', 'DESC']
            ]
        };
        try {
            let documents = await Document.findAndCountAll(options);
            cb(null, documents);
        } catch (err) {
            console.log(err);
            cb(err)
        }
    }

};