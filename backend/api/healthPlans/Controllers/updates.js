'use strict';
const dbmain = require('../../../config/DB/DBmain');

module.exports = {
    async updateHealthPlan (info, id, cb) {
        let HealthPlan = dbmain.model('HealthPlan');
        try {
            HealthPlan.update(info, { returning: true, where: { id: id } }
            ).then(async function([rowsUpdated, [healthPlanUpdated]]) {
                if(!healthPlanUpdated)
                    return cb(null, false);
                return cb(null, true)
            })
        } catch (err) {
            console.error(err);
            cb(err);
        }
    }
};
