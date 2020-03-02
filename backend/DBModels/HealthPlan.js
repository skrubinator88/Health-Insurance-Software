'use strict';
const dbmain = require('../config/DB/DBmain');
const Sequelize = dbmain.Seq();

module.exports = {
    model: {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: Sequelize.STRING,
        type: Sequelize.STRING,
        deductible: Sequelize.DOUBLE,
        description: Sequelize.STRING,
        premium: Sequelize.DOUBLE,
        ProviderId: Sequelize.INTEGER,
    },
    options: {
        freezeTableName: true,
    }
};