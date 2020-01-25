const dbmain = require('../../../config/DB/DBmain');
const uuidv4 = require('uuid/v4');
module.exports = {
    async addPatient(opts, cb) {
        let Patient = dbmain.model("Patient");
        console.log(opts)
        try {
            await Patient.findOrCreate({
                where: { name: opts.name.toUpperCase() },
                defaults: {
                    id: uuidv4(),
                    street1: opts.street ? opts.street : null,
                    street2: opts.street2 ? opts.street2 : null,
                    sex: opts.sex ? (opts.sex.substring(0,1).toLowerCase() === 'm' ? 1 : 0) : null,
                    city: opts.city ? opts.city : null,
                    state: opts.state ? opts.state : null,
                    zipCode: opts.zipCode ? opts.zipCode : null,
                    telephone1: opts.phone ? opts.phone : null,
                    height: opts.height,
                    weight: opts.weight,
                    insuranceType: opts.insuranceType,
                    insuranceNo: opts.insuranceNo,
                    birthdate: opts.birthdate,
                    doctor: opts.doctor
                }
            }).spread((patient, created) => {
                if(created) {
                    console.log('new patient created ' + patient.id);
                    return cb(null, patient.get());
                } else {
                    console.log('Account has already been created');
                    return cb(null, created, { error: 'Patient already exists' })
                }
            });
        } catch(err) {
            console.log(err);
            cb(err)
        }
    },
    async postDocuments(patientId, docs, cb) {
        try {
            let Document = dbmain.model("Document");
            let documents = docs.map(async (doc) => {
                return await Document.create({
                    PatientId: patientId,
                    documentName: doc.key,
                    documentUrl: doc.location
                });
            });
            cb(null, documents)
        } catch(err) {
            cb(err);
        }
    }
}