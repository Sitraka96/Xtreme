const { Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');
const database  = process.env.db_database;
const username  = process.env.db_username;
const password  = process.env.db_password;
const dialect = process.env.db_dialect;

const sequelize = new Sequelize(database, username, password, 
    {
        host: 'localhost',
        dialect: dialect,
        logging: false,
    }
);

sequelize.sync({ alter: false, force: false });

console.log('Connection to db successful !');

module.exports = sequelize;