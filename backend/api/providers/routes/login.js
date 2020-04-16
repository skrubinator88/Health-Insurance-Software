"use strict";
const { loginProvider } = require('../../Services/profileAuthService');
const {validateRequest, generateLoginResponse} = require('../../Actions/authActions');
//route used for logging a user in
module.exports = async (req, res, next) => {
    try {
        let response = await validateRequest(req, 'login');
        if (response.message) return res.status(response.status).send({error: response.message});
    } catch(err) {}
    await loginProvider(req.body, async (err, provider, info) => {
        if (err) return next(err);
        if (!provider) return res.status(400).send({error: info.message});
        let response = await generateLoginResponse(provider);
        res.status(200).send(response);
    });
};
