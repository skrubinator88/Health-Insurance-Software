'use strict';
const dbmain = require('../config/DB/DBmain');
const Sequelize = dbmain.Seq();

module.exports = {
    model: {
        member_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        gender: Sequelize.STRING(2),
        birthdate: Sequelize.DATE,
        email: Sequelize.STRING,
        phoneNo: Sequelize.STRING,
        street: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        zipcode: Sequelize.STRING,
        ClaimId: Sequelize.INTEGER,
        password: Sequelize.STRING
    },
    options: {
        freezeTableName: true,
    }
};