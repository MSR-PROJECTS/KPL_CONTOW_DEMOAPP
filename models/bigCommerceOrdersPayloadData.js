const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const BigCommerceOrdersPayloadData = sequelize.define('BigCommerceOrdersPayloadData', {
    FDPAYLOADDATAID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    FDID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    FDTYPE: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'TBBIGCOMMERCEORDERSPAYLOADDATA',
    timestamps: false,
});

module.exports = BigCommerceOrdersPayloadData;
