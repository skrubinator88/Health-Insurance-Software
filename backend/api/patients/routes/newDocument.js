const { postDocuments } = require('../Controllers/posts');
const { uploadUserFile } = require('../../Helpers/fileUpload');
const multipleUpload = uploadUserFile().array('patient-docs', 12);

module.exports = async function (req, res, next) {
    let patientId = req.params.patientId;
    req.patientId = patientId;
    await multipleUpload(req, res, async (err) => {
        if(err)
            return next(err);
        if(!req.files)
            return res.json({error: 'Error: No file selected'});
        let docs = req.files.map(file => {
            return {"key": file.metadata.fieldName, "location": file.location}
        });
        await postDocuments(patientId, docs, function(err, added) {
            if(err) {
                return next(err);
            }
            if(!added) {
                res.status(500).send({
                    error: 'There was an error while trying to add documents'
                })
            } else {
                res.status(200).send(added);
            }
        })

    });
};