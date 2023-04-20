const bcrypt = require('bcryptjs')

const { Sequelize, DataTypes } = require('sequelize')

const sequelize = require('../config/dbConfig')

var Clients = sequelize.define('client',{
        id_client: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nom_client:{
            type: DataTypes.STRING,
            allownull: false,
        },
        prenom_client:{
            type: DataTypes.STRING,
            allownull: false,
        },
        pseudo_client:{
            type: DataTypes.STRING,
            allownull: false,
        },
        mot_de_passe_client: { 
            type: DataTypes.STRING
        },
        email_client:{
            type: DataTypes.STRING,
            unique:true,
            validate: {
                isUnique: (value, next) => {
                    Clients.findAll({
                      where: { email_client: value },
                      attributes: ['id_client'],
                    })
                      .then((client) => {
                        if (client.length != 0)
                          next(new Error('Email address already in use!'));
                        next();
                      })
                      .catch((onError) => console.log(onError));
                  },
            }
        },
        point_client: DataTypes.FLOAT,
        date_de_validation : DataTypes.DATE,
        code_de_modification: DataTypes.STRING,
        photo_profil : DataTypes.STRING

    },{
        sequelize,
        freezeTableName:true,
        hooks: {
            beforeCreate: async (client) => {
                if (client.mot_de_passe_client) {
                    const salt = await bcrypt.genSaltSync(10);
                    client.mot_de_passe_client = bcrypt.hashSync(client.mot_de_passe_client, salt);
                }
            },
            beforeUpdate:async (client) => {
                if (client.mot_de_passe_client) {
                    const salt = await bcrypt.genSaltSync(10);
                    client.mot_de_passe_client = bcrypt.hashSync(client.mot_de_passe_client, salt);
                }
            }
        },
})

Clients.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.mot_de_passe_client);
  };

module.exports = Clients

