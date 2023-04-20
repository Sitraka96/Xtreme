const bcrypt = require('bcryptjs')

const { Sequelize, DataTypes } = require('sequelize')

const sequelize = require('../config/dbConfig')

var Admin = sequelize.define('admin',{
        id_admin: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username:{
            type: DataTypes.STRING,
            allownull: false,
            unique:true
        },
        password_admin: { 
            type: DataTypes.STRING
        },
        email_admin:{
            type: DataTypes.STRING,
            unique:true,
            validate: {
                isUnique: (value, next) => {
                    Admin.findAll({
                      where: { email_admin: value },
                      attributes: ['id_admin'],
                    })
                      .then((admin) => {
                        if (admin.length != 0)
                          next(new Error('Email address already in use!'));
                        next();
                      })
                      .catch((onError) => console.log(onError));
                  },
            }
        }
    },{
        sequelize,
        freezeTableName:true,
        hooks: {
            beforeCreate: async (admin) => {
                if (admin.password_admin) {
                    const salt = await bcrypt.genSaltSync(10);
                    admin.password_admin = bcrypt.hashSync(admin.password_admin, salt);
                }
            },
            beforeUpdate:async (admin) => {
                if (admin.password_admin) {
                    const salt = await bcrypt.genSaltSync(10);
                    admin.password_admin = bcrypt.hashSync(admin.password_admin, salt);
                }
            }
        },
})

Admin.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password_admin);
  };

module.exports = Admin

