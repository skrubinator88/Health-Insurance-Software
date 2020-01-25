'use strict';
const dbmain = require('../config/DB/DBmain');
const Sequelize = dbmain.Seq();

module.exports = {
    model: {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
        },
        username: Sequelize.STRING,
        password: Sequelize.STRING,
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING
    },
    options: {
        freezeTableName: true,
    }
};