'use strict';
const dbmain = require('../../../config/DB/DBmain');

module.exports = {
    async postHealthPlan(info, cb) {
        try {
            let HealthPlan = dbmain.model("HealthPlan");
            let healthPlan = await HealthPlan.create(info);
            cb(null, healthPlan)
        } catch(err) {
            cb(err);
        }
    }
};