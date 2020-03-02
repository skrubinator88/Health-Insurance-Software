'use strict';
const dbmain = require('../config/DB/DBmain');
const Sequelize = dbmain.Seq();

module.exports = {
    model: {
        claimNo: {
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        claimStatus: Sequelize.STRING,
        claimDate: Sequelize.DATE,
        amountBilled: Sequelize.DOUBLE,
        amountPaid: Sequelize.DOUBLE,
        serviceDetail: Sequelize.STRING,
        amountDenied: Sequelize.DOUBLE,
        serviceDate: Sequelize.DATE,
        HealthPlanId: Sequelize.INTEGER
    },
    options: {
        freezeTableName: true,
    },
};