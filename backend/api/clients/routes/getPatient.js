"use strict";
const { getPatientById } = require('../Controllers/queries');
//route used for retrieving a specific user
module.exports = async function (req, res, next) {
    let patientId = req.params.patientId;
    await getPatientById(patientId, function(err, patient) {
        if(err)
            return next(err);
        if(patient) {
            return res.status(200).send(patient);
        } else {
            return res.status(200).send({});
        }
    });
};