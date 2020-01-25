'use strict';
const dbmain = require('../config/DB/DBmain');
const Sequelize = dbmain.Seq();

module.exports = {
    model: {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        invoiceNo: {
            type: Sequelize.STRING
        },
        status: Sequelize.STRING,
        PatientId: Sequelize.UUID,
        date: Sequelize.DATE,
        invoiceNum: Sequelize.STRING,
        invoiceStreet1: Sequelize.STRING,
        invoiceCity: Sequelize.STRING,
        invoiceState: Sequelize.STRING,
        invoiceZipCode: Sequelize.STRING,
        salesTax: Sequelize.FLOAT,
        salesman: Sequelize.STRING,
        insuranceType: Sequelize.STRING,
        insuranceNo: Sequelize.STRING,
        url: Sequelize.STRING
    },
    options: {
        freezeTableName: true,
    }
};