'use strict';
const dbmain = require('../../../config/DB/DBmain');
const {generateFile} = require('../../Helpers/pdfHandler');
const {uploadFile} = require('../../Helpers/fileUpload');
const {extractKey, generateGrandTotal, generateSubTotal, generateSalesTax} = require('../invoiceActions');

module.exports = {
    async updateInvoice (info, id, cb) {
        let Invoice = dbmain.model('Invoice');
        let Patient = dbmain.model('Patient');
        let Item = dbmain.model('Item');
        try {
            let invoice = await Invoice.findAll({
                where: {id: id},
                attributes: ['PatientId', 'url', 'invoiceNo']
            });
            let patient = await Patient.findById(invoice[0].PatientId);
            info.opts.subtotal = generateSubTotal(info.items);
            info.opts.salesTax = generateSalesTax(info.opts.subtotal, 0.06);
            info.opts.total = generateGrandTotal(info.opts.subtotal, info.opts.salesTax);
            info.opts.invoiceNo = invoice[0].invoiceNo;
            let fileObj = {
                patient,
                info: info.opts,
                items: info.items
            };
            let fileData = await generateFile(fileObj);
            let url = await uploadFile(fileData, extractKey(invoice[0].url));
            await Item.destroy({ where: {InvoiceId: id} });
            Invoice.update(
               {
                   url: url.url,
                   status: info.opts.status,
                   invoiceStreet1: info.opts.address
               }, { returning: true, where: { id: id } }
            ).then(async function([rowsUpdated, [invoiceUpdated]]) {
                if(!invoiceUpdated)
                    return cb(null, false);

                await Promise.all(info.items.map(async item => {
                    await Item.create({
                        name: item.name,
                        price: item.price,
                        qty: item.qty,
                        InvoiceId: id,
                        part: item.part
                    })
                }));
                return cb(null, true)
            })
        } catch (err) {
            console.error(err);
            cb(err);
        }
    }
};