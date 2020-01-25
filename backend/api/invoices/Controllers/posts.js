'use strict';
const dbmain = require('../../../config/DB/DBmain');
const uuidv4 = require('uuid/v4');
const { generateFile } = require('../../Helpers/pdfHandler');
const { uploadFile } = require('../../Helpers/fileUpload');
const {generateSalesTax, generateSubTotal, generateGrandTotal, generateInvoiceNo} = require("../invoiceActions");

module.exports = {
    async generateInvoice (info, cb) {
        const Patient = dbmain.model('Patient');
        try {
            let patient = await Patient.findById(info.PatientId);
            info.opts.subtotal = generateSubTotal(info.items);
            info.opts.salesTax = generateSalesTax(info.opts.subtotal, 0.06);
            info.opts.total = generateGrandTotal(info.opts.subtotal, info.opts.salesTax);
            info.opts.invoiceNo = await generateInvoiceNo(patient.id);
            let contents = {
                patient,
                items: info.items,
                info: info.opts
            };
            let data = await generateFile(contents);
            let date = new Date();
            let fileName = `invoice-${patient.id}-${date.getTime()}.pdf`;
            let key = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/${fileName}`;
            let url = await uploadFile(data, key);
            cb(null, url)
        } catch (err) {
            console.error(err);
            cb(err);
        }
    },
    async postInvoice(info, cb) {
        try {
            let Invoice = dbmain.model("Invoice");
            let Item = dbmain.model("Item");
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

            await Promise.all(info.items.map(async item => {
                await Item.create({
                    name: item.name,
                    price: item.price,
                    qty: item.qty,
                    InvoiceId: invoice.id,
                    part: item.part
                })
            }));
            cb(null, invoice)
        } catch(err) {
            cb(err);
        }
    }
};