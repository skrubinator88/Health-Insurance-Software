"use strict";
const { addPatient } = require('../Controllers/posts');
//route used for retrieving a specific user
module.exports = async function (req, res, next) {

    await addPatient(req.body, function(err, patient, message) {
        if(err)
            return next(err);
        if(patient) {
            return res.status(200).send(patient);
        } else {
            return res.status(400).send(message);
        }
    });
};