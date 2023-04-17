const connexion = require('../config/dbConfig');
//modele login administration

const admin = (admin)=>{
    this.email_admin = admin.email_admin;
    this.password_admin = admin.password_admin;
}

admin.findOneByEmailAdmin = (email,result)=>{
    let sql = "SELECT * FROM admin WHERE email_admin = ?";
    connexion.query(sql,[email],(err, res)=>{
        if(err)
            result(null, err);
        else
            result(null, res);
    });
}
module.exports = admin;