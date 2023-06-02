const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const Retrait = sequelize.define('Retrait', {
  montant: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  email_destinataire: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paypal_payout_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  statut: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paypal_response: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});


module.exports = Retrait;
