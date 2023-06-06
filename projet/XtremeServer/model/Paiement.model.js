// paiement.model.js

const { DataTypes } = require('sequelize');
const db = require('../config/dbConfig'); // Assurez-vous d'avoir configuré la connexion à votre base de données

const Paiement = db.define('Paiement', {
  montant: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  email_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  payer_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  transactionIDValue: {
    type: DataTypes.STRING,
    allowNull: false
  },
  payment_id: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Paiement;
