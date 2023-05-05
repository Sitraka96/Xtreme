const bcrypt = require('bcryptjs')

const { Sequelize, DataTypes } = require('sequelize')

const sequelize = require('../config/dbConfig')

const Clients = sequelize.define('clients', {
    id_client: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nom_client: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenom_client: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pseudo_client: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mot_de_passe_client: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_client: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    photo_profil_path: {
      type: DataTypes.STRING,
      defaultValue: 'public/profil.png',
    },
    photo_profil: {
      type: DataTypes.STRING,
    },
    point_client: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    date_de_validation: {
      type: DataTypes.DATE,
    },
    code_de_modification: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
    sequelize,
    freezeTableName: true,
    hooks: {
      beforeCreate: async (client) => {
        if (client.mot_de_passe_client) {
          const salt = await bcrypt.genSaltSync(10);
          client.mot_de_passe_client = bcrypt.hashSync(client.mot_de_passe_client, salt);
        }
      },
      beforeUpdate: async (client) => {
        if (client.mot_de_passe_client) {
          const salt = await bcrypt.genSaltSync(10);
          client.mot_de_passe_client = bcrypt.hashSync(client.mot_de_passe_client, salt);
        }
      },
    },
  });
  
  Clients.validateUniqueEmail = async (email) => {
    const client = await Clients.findOne({
      where: {
        email_client: email,
      },
    });
    if (client) {
      throw new Error('Cet email existe déjà !');
    }
  };
  
  Clients.uploadPhotoProfil = async (fileName, base64data) => {
    const path = 'public/images/Clients/' + fileName;
    return new Promise((resolve, reject) => {
      fs.writeFile(path, base64data, 'base64', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(path);
        }
      });
    });
  };

Clients.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.mot_de_passe_client);
  };

module.exports = Clients

