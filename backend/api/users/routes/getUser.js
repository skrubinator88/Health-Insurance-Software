const { getUserById } = require('../Controllers/queries');

module.exports = async function (req, res, next) {
    await getUserById(req.params.userId, function(err, user) {
        if(err) {
            return next(err);
        }
        res.status(200).send(user)
    })
};