const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('DBCT', 'postgres', 'password123', {
    host: 'database-1.cnaoss842wbn.ap-south-1.rds.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

module.exports = sequelize;
