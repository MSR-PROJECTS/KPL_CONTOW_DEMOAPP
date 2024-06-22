const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const BigCommerceOrdersPayloadData = require('./bigCommerceOrdersPayloadData');

const BigCommerceOrdersPayload = sequelize.define('BigCommerceOrdersPayload', {
    FDPAYLOADID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    FDHASH: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    FDCREATEDAT: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    FDPRODUCER: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    FDSCOPE: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    FDSTOREID: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    FDPAYLOADDATAID: {
        type: DataTypes.INTEGER,
        references: {
            model: BigCommerceOrdersPayloadData,
            key: 'FDPAYLOADDATAID',
        },
    },
}, {
    tableName: 'TBBIGCOMMERCEORDERSPAYLOAD',
    timestamps: false,
});

BigCommerceOrdersPayload.belongsTo(BigCommerceOrdersPayloadData, { foreignKey: 'FDPAYLOADDATAID' });
BigCommerceOrdersPayloadData.hasMany(BigCommerceOrdersPayload, { foreignKey: 'FDPAYLOADDATAID' });

module.exports = BigCommerceOrdersPayload;
