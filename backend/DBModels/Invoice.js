'use strict';
const dbmain = require('../config/DB/DBmain');
const Sequelize = dbmain.Seq();

module.exports = {
    model: {
        invoiceNo: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        invoiceStatus: Sequelize.STRING,
        invoiceDate: Sequelize.DATE,
        MemberId: Sequelize.INTEGER,
        ProviderId: Sequelize.INTEGER
    },
    options: {
        freezeTableName: true,
    }
};