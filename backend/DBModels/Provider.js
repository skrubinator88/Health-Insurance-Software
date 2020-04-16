'use strict';
const dbmain = require('../config/DB/DBmain');
const Sequelize = dbmain.Seq();

module.exports = {
    model: {
        name: Sequelize.STRING,
        username: Sequelize.STRING,
        providerId: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        password: Sequelize.STRING,
        telephone: Sequelize.STRING,
        specialty: Sequelize.STRING,
        street: Sequelize.STRING,
        city: Sequelize.STRING,
        zipcode: Sequelize.STRING,
        state: Sequelize.STRING
    },
    options: {
        freezeTableName: true,
    }
};
