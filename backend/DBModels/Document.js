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
        documentName: Sequelize.STRING,
        documentUrl: Sequelize.STRING,
        PatientId: Sequelize.UUID,
    },
    options: {
        freezeTableName: true,
    }
};