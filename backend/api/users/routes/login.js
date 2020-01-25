"use strict";
const { loginUser } = require('../Services/profileAuthService');
const {validateRequest, generateLoginResponse} = require('../userActions');
//route used for logging a user in
module.exports = async (req, res, next) => {
    try {
        let response = await validateRequest(req, 'login');
        if (response.message) return res.status(response.status).send({error: response.message});
    } catch(err) {}
    await loginUser(req.body, async (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).send({error: info.message});
        let response = await generateLoginResponse(user);
        res.status(200).send(response);
    });
};