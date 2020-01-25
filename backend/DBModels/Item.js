'use strict';
const dbmain = require('../config/DB/DBmain');
const Sequelize = dbmain.Seq();

module.exports = {
    model: {
        name: Sequelize.STRING,
        price: Sequelize.DOUBLE,
        qty: Sequelize.INTEGER,
        InvoiceId: Sequelize.UUID,
        itax: Sequelize.INTEGER,
        note: Sequelize.STRING,
        part: Sequelize.STRING
    },
    options: {
        freezeTableName: true,
        timestamps: false
    }
};