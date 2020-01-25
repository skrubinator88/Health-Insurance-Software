'use strict';
const dbmain = require('../../../config/DB/DBmain');
const { getUserRole } = require('../userActions');
module.exports = {
    async getUsers (opts, cb) {
        const User = dbmain.model('User');
        const UserRole = dbmain.model('User_Role');
        const Role = dbmain.model('Role');
        let options = {
            where: opts.query || {},
            limit: opts.pageSize,
            offset: opts.page
        };
        try{
            let users = await User.findAll(options);
            let response = await Promise.all(await users.map(async user => {
               let userRole = await UserRole.findOne({where: {UserId: user.id}});
               let role = await Role.findById(userRole.RoleId);
               return {
                   id: user.id,
                   firstName: user.firstName,
                   lastName: user.lastName,
                   username: user.username,
                   password: user.password,
                   role: role.name
               };
            }));
           return cb(null,response);
        } catch(err) {
            return cb(err);
        }
    },
    async getUserById (id, cb) {
        let User = dbmain.model('User');
        try{
            let user = await User.findById(id);
            if(user) {
                let role = await getUserRole(id);
                return cb(null, {
                    name: user.firstName + ' ' + user.lastName,
                    userRole: role,
                    id: id
                });
            } else return cb(null, null)
        } catch(err) {
            console.error(err);
            return cb(err);
        }
    }
};