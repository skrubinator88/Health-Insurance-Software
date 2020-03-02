'use strict';
const {updatePatient} = require('../Controllers/updates');
module.exports = async function (req, res, next) {
    let patientId = req.params.patientId;
    await updatePatient(req.body, patientId, function(err, updated) {
        if(err)
            return next(err);
        if(!updated)
            return res.status(400).send({
                error: 'Patient could not be updated'
            });
        res.status(200).send({
            message: 'user successfully updated'
        })
    });
};