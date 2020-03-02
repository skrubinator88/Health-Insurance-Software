'use strict';
const dbmain = require('../../config/DB/DBmain');
const {SUPERUSER, ADMIN, BASIC} = require('../providers/UserConstants');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const uuidv4 = require('uuid/v4');

module.exports = {
    async createProvider (info, cb) {
        const Provider = dbmain.model('Provider');
        try {
            let hashedPassword = await bcrypt.hash(info.password, saltRounds);
            let user = await Provider.findOrCreate({
                where: {
                    name: info.name,
                    password: hashedPassword
                },
                defaults: {
                    telephone: info.telephone,
                    specialty: info.specialty,
                    street: info.street,
                    city: info.city,
                    zipcode: info.zipCode,
                    state: info.state
                }});
            let isCreated = user[1];
            let createdUser = user[0];
            if(isCreated) {
                return cb(null, createdUser.get());
            } else {
                return cb(null, isCreated, { message: 'username is already in use' })
            }
        } catch (err) {
            console.error(err);
            cb(err);
        }
    },
    async createClient (info, cb) {
        const Client = dbmain.model('Client');
        try {
            let hashedPassword = await bcrypt.hash(info.password, saltRounds);
            let user = await Client.findOrCreate({
                where: { email: info.name.toLowerCase() },
                defaults: {
                    firstName: info.firstName,
                    street: info.street,
                    gender: info.gender,
                    city: info.city,
                    state: info.state,
                    zipCode: info.zipCode,
                    phoneNo: info.phone ? info.phone : null,
                    birthdate: info.birthdate,
                    ClaimId: info.claimId,
                }});
            let isCreated = user[1];
            let createdUser = user[0];
            if(isCreated) {
                return cb(null, createdUser);
            } else {
                return cb(null, isCreated, { message: 'username is already in use' })
            }
        } catch (err) {
            console.error(err);
            cb(err);
        }
    },
    async loginProvider (info, cb) {
        const Provider = dbmain.model('Provider');
        try {
            let user = await User.findOne({where: { username: info.username }});
            if(!user) return cb(null, false, {message: 'Invalid username or password'});
            //validate password
            const match = await bcrypt.compare(info.password, user.password);
            if(!match) return cb(null, false, {message: 'Invalid username or password'});
            return cb(null, {
                id: user.id,
                name: user.firstName + ' ' + user.lastName
            });
        } catch (err) {
            console.error(err);
            cb(err);
        }
    },
    async loginClient (info, cb) {
        const Provider = dbmain.model('Provider');
        try {
            let user = await User.findOne({where: { username: info.username }});
            if(!user) return cb(null, false, {message: 'Invalid username or password'});
            //validate password
            const match = await bcrypt.compare(info.password, user.password);
            if(!match) return cb(null, false, {message: 'Invalid username or password'});
            return cb(null, {
                id: user.id,
                name: user.firstName + ' ' + user.lastName
            });
        } catch (err) {
            console.error(err);
            cb(err);
        }
    }
};