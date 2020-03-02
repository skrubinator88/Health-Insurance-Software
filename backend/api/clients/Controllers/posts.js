const dbmain = require('../../../config/DB/DBmain');
const uuidv4 = require('uuid/v4');

module.exports = {
    async addClient(opts, cb) {
        let Client = dbmain.model("Client");
        try {
            let hashedPassword = await bcrypt.hash(info.password, saltRounds);

            await Client.findOrCreate({
                where: { email: opts.name.toLowerCase() },
                defaults: {
                    firstName: opts.firstName,
                    street: opts.street,
                    gender: opts.gender,
                    city: opts.city,
                    state: opts.state,
                    zipCode: opts.zipCode,
                    phoneNo: opts.phone ? opts.phone : null,
                    birthdate: opts.birthdate,
                    ClaimId: opts.claimId,
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