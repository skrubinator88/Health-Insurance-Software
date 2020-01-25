'use strict';
const dbmain = require('../config/DB/DBmain');
const Sequelize = dbmain.Seq();

module.exports = {
    model: {
        UserId: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        RoleId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    },
    options: {
        freezeTableName: true,
    }
};