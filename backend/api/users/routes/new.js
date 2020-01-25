"use strict";
const { createUser } = require('../Services/profileAuthService');
const {validateRequest} = require('../userActions');
const {SUPERUSER} = require('../UserConstants')

module.exports = async (req, res, next) => {
    if(req.userRole !== SUPERUSER) return res.status(401).send({error: 'Insufficient access'})
    try {
        let response = await validateRequest(req, 'new');
        if(response.message) return res.status(response.status).send({error: response.message});
    } catch(err) {}
    await createUser(req.body, function (err, user, info) {
        if (err) return next(err);
        if (!user) return res.status(400).send({error: info.message});
        res.status(200).send({message: 'User successfully created'});
    });
};