const { getDocumentById } = require('../Controllers/queries');

module.exports = async function (req, res, next) {
    await getDocumentById(req.params.documentId, function(err, document) {
        if(err) {
            return next(err);
        }
        res.status(200).send(document)
    })
};