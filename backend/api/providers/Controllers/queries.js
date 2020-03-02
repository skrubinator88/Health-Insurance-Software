'use strict';
const dbmain = require('../../../config/DB/DBmain');
const { getUserRole } = require('../../Actions/authActions');
module.exports = {
    async getProviders (opts, cb) {
        const Provider = dbmain.model('Provider');
        let options = {
            where: opts.query || {},
            limit: opts.pageSize,
            offset: opts.page
        };
        try{
            let providers = await Provider.findAll(options);
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