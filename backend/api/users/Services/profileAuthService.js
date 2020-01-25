'use strict';
const dbmain = require('../../../config/DB/DBmain');
const {SUPERUSER, ADMIN, BASIC} = require('../UserConstants');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const uuidv4 = require('uuid/v4');

module.exports = {
    async createUser (info, cb) {
        const User = dbmain.model('User');
        const UserRole = dbmain.model('User_Role');
        try {
            let hashedPassword = await bcrypt.hash(info.password, saltRounds);
            let user = await User.findOrCreate({
                where: { username: info.username },
                defaults: {
                    password: hashedPassword,
                    firstName: info.firstName,
                    lastName: info.lastName,
                    id: uuidv4()
                }});
            let isCreated = user[1];
            let createdUser = user[0];
            if(isCreated) {
                let role = 2;
                if(info.role === SUPERUSER) role = 0;
                if(info.role === ADMIN ) role = 1;
                await UserRole.create({UserId: createdUser.id, RoleId: role});
                return cb(null, createdUser);
            } else {
                return cb(null, isCreated, { message: 'username is already in use' })
            }
        } catch (err) {
            console.error(err);
            cb(err);
        }
    },
    async loginUser (info, cb) {
        const User = dbmain.model('User');
        const UserRole = dbmain.model('User_Role');
        const Role = dbmain.model('Role');
        try {
            let user = await User.findOne({where: { username: info.username }});
            if(!user) return cb(null, false, {message: 'Invalid username or password'});
            //validate password
            const match = await bcrypt.compare(info.password, user.password);
            if(!match) return cb(null, false, {message: 'Invalid username or password'});
            //find user role
            let userRole = await UserRole.findOne({where: {UserId: user.id}});
            let role = await Role.findOne({where: {id: userRole.RoleId}});
            return cb(null, {
                id: user.id,
                role: role.name,
                name: user.firstName + ' ' + user.lastName
            });
        } catch (err) {
            console.error(err);
            cb(err);
        }
    }
};