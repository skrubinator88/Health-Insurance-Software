'use strict';
const dbmain = require('../../../config/DB/DBmain');
const bcrypt = require('bcrypt');
const saltRounds = 5;

module.exports = {
    async updateUserById (id, attributes, cb) {
        const User = dbmain.model('User');
        const Role = dbmain.model('Role');
        const UserRole = dbmain.model('User_Role');
        try {
            if(attributes.password) attributes.password = await bcrypt.hash(attributes.password, saltRounds);
            if(attributes.role) {
                let role = await Role.findOne({where: {name: attributes.role}});
                await UserRole.update({RoleId: role.id}, {where: {UserId: id}});
            }
            await User.update( attributes, { where: { id: id } });
            return cb(null)
        } catch (err) {
            return cb(err)
        }
    },
    async deleteUser (id, cb) {
        const User = dbmain.model('User');
        const UserRole = dbmain.model('User_Role');
        try {
            await User.destroy({where: {id: id}});
            await UserRole.destroy({where: {UserId: id}});
            cb(null, true);
        } catch (err) {
            console.error(err);
            cb(err);
        }
    },
};