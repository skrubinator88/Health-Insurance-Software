'use strict';
const { getUsers } = require('../Controllers/queries');
const {validateQuery} = require('../../Actions/routeActions')
module.exports = async function (req, res, next) {
    let validatedQuery = validateQuery(req.query);
    if(validatedQuery.error) return res.status(400).send(validatedQuery.error);
    let infoObject = {
        page: validatedQuery.pageNo,
        pageSize: validatedQuery.pageLimit,
        query: { }
    };
    await getUsers(infoObject, (err, users) => {
        console.log(users);
        if(err) return next(err);
        res.status(200).send(users);
    })
};