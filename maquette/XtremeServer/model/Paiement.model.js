const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
// pour l'identifiant id_utilisateur
const generateUserId = () => {
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomLetter = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters[Math.floor(Math.random() * letters.length)];
  };

  let userId = '';
  for (let i = 0; i < 3; i++) {
    userId += getRandomInt(0, 9); // Ajoute un chiffre aléatoire entre 0 et 9
  }
  for (let i = 0; i < 2; i++) {
    userId += getRandomLetter(); // Ajoute une lettre aléatoire
  }
  return userId;
};



const Paiement = sequelize.define('Paiement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_utilisateur: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
    defaultValue: generateUserId,
  },
  email_client: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  montant: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  statut: {
    type: DataTypes.ENUM('en attente', 'payé', 'annulé'),
    defaultValue: 'en attente',
  },
  paypal_payment_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // payerId: { // Ajout du champ payerId
  //   type: DataTypes.STRING,
  //   allowNull: true,
  // },
  paypal_approval_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  payerId: {
    type: DataTypes.STRING,
    allowNull: true,
  },

});

module.exports = Paiement;
