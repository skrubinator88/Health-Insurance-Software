'use strict';
const dbmain = require('../../../config/DB/DBmain');
const bcrypt = require('bcrypt');
const saltRounds = 5;

module.exports = {
    async updatePatient (opts, id, cb) {
        let Patient = dbmain.model('Patient');
        try {
            Patient.update(
                opts, { returning: true, where: { id: id } }
            ).then(async function([rowsUpdated, [patientUpdated]]) {
                if(!patientUpdated)
                    return cb(null, false);
                return cb(null, true)
            })
        } catch (err) {
            console.error(err);
            cb(err);
        }
    }
};