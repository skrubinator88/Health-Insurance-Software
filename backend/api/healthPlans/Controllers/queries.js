'use strict';

const dbmain = require('../../../config/DB/DBmain');

module.exports = {
    async getHealthPlans (page, limit, query, cb) {
        let HealthPlan = dbmain.model('HealthPlan');
        let options = {
            where: query || {},
            limit: limit,
            offset: page
        };
        try {
            let response = [];
            let healthPlans = await HealthPlan.findAll(options);
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
    async getHealthPlan (id, cb) {
        let HealthPlan = dbmain.model('HealthPlan');
        try {
            let healthPlan = await HealthPlan.findById(id);
            cb(null, healthPlan)
        } catch(err) {
            console.error(err);
            cb(err)
        }
    }
};
