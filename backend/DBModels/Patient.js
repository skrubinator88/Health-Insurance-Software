'use strict';
const dbmain = require('../config/DB/DBmain');
const Sequelize = dbmain.Seq();

module.exports = {
    model: {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        name: Sequelize.STRING,
        sex: Sequelize.STRING,
        height: Sequelize.STRING,
        weight: Sequelize.STRING,
        doctor: Sequelize.STRING,
        street1: Sequelize.STRING,
        street2: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        zipCode: Sequelize.STRING,
        telephone1: Sequelize.STRING,
        telephone2: Sequelize.STRING,
        insuranceType: Sequelize.STRING,
        insuranceNo: Sequelize.STRING,
        birthdate: Sequelize.DATE
    },
    options: {
        freezeTableName: true,
    }
};