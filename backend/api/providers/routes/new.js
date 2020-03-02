"use strict";
const { createProvider } = require('../../Services/profileAuthService');
const {validateRequest, generateLoginResponse} = require('../../Actions/authActions');

module.exports = async (req, res, next) => {
    try {
        let response = await validateRequest(req, 'new');
        if(response.message) return res.status(response.status).send({error: response.message});
    } catch(err) {}
    await createProvider(req.body, async function (err, user, info) {
        if (err) return next(err);
        if (!user) return res.status(400).send({error: info.message});
        let response = await generateLoginResponse(user);
        res.status(200).send(response);
    });
};