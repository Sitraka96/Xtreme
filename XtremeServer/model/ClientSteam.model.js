const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../config/dbConfig')

const ClientSteam = sequelize.define('userSteam', {
    id_userSteam: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nom_userSteam: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password_userSteam: {
        type: DataTypes.STRING,
        allowNull: false
    },
    steamId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    displayNom: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
},{
    timestamps: false
});

module.exports = ClientSteam;