'use strict';
const { updateProduct: updateDocument } = require('../Controllers/updates');
module.exports = async function (req, res, next) {
    let productId = req.params.productId;
    updateDocument(req.body, productId, function(err, completed) {
        if(err) {
            return next(err)
        }
        res.status(200).send(completed)
    });
};