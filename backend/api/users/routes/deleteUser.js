'use strict';
const { deleteUser } = require('../Controllers/updates');
const {SUPERUSER} = require('../UserConstants')

/*req.body: items, opts, (optional) file*/
module.exports = async function (req, res, next) {
    if(req.userRole !== SUPERUSER) return res.status(401).send({error: 'Insufficient access'})
    let userId = req.params.userId;
    await deleteUser(userId, function(err) {
        if(err) {
            return next(err)
        }
        res.status(200).end()
    });
};