const Clients = require('../model/Clients.model');
const AchatXtremePoint = sequelize.define('AchatXtremePoint',{
        id_achatxtremepoint: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        id_client: DataTypes.STRING,
        id_xtremepoint: DataTypes.STRING,
        somme_achatxtremepoint: DataTypes.FLOAT
    },{
        sequelize,
        freezeTableName: true
    })

AchatXtremePoint.belongsTo(Clients, {as:'Clients',foreignKey:'id_client'})

module.exports = AchatXtremePoint;
