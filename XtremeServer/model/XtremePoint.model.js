const {DataTypes} = require('sequelize');
const sequelize = require('../config/dbConfig');

const XtremePoint = sequelize.define('XtremePoint',{
    id_xtremepoint: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    titre_xtremepoint: DataTypes.STRING,
    point_xtremepoint: DataTypes.FLOAT,
    prix_xtremepoint: DataTypes.FLOAT,
    date_xtremepoint: DataTypes.DATE
    },{ 
        timestamps: false,
        sequelize,
        freezeTableName:true,
    })

module.exports = XtremePoint;