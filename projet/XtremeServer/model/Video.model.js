const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

// Définition du modèle Video
const Video = sequelize.define('Video', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  point: {
    type: DataTypes.STRING,
    allowNull: false
  },
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Video;
