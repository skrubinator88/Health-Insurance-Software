const dbmain = require('../../config/DB/DBmain');

module.exports = {
    generateSubTotal(items) {
        let sum = 0;
        for(let i = 0; i < items.length; i++) {
            let price = items[i].price ? items[i].price : 0;
            let qty = items[i].qty ? items[i].qty : 0;
            sum += parseFloat((parseFloat(price) * parseInt(qty)).toFixed(2));
        }
        return (sum).toFixed(2)
    },
    generateSalesTax(subTotal, taxPercent) {
        return  parseFloat((subTotal * taxPercent).toFixed(2)).toFixed(2);
    },
    generateGrandTotal(subTotal, salesTax) {
        return parseFloat(parseFloat(subTotal) + parseFloat(salesTax)).toFixed(2)
    },
    async generateInvoiceNo(patientId) {
        const Invoice = dbmain.model("Invoice");
        return zeroPad(await Invoice.count({where: {PatientId: patientId}}) + 1, 6);
    },
    extractKey(url) {
        let key = url.split('com')[1];
        return key.substring(1, key.length)
    }
};

const zeroPad = (num, places) => {
    return String(num).padStart(places, '0')
};