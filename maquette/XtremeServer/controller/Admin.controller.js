const jwt = require('jsonwebtoken');
const Admin = require('../model/Admin.model');
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs');
const ent = require('ent');
const secretKey = process.env.secretKey_admin;
const origineAdmin = process.env.OriginAdmin;

//function qui permet au utilisateur de se connecter
exports.adminLogin = async (req, res)=>{
    
    res.setHeader("Access-Control-Allow-Origin", origineAdmin);
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    const { password, email } = {
            email: req.body.email_admin? ent.encode(req.body.email_admin) : "",
            password: req.body.password_admin ? ent.encode(req.body.password_admin): "",
        }

    const admin = await Admin.findOne({
        where:
        {   [Op.or]: [
                { email_admin: email }
            ] 
        }
    });

    if (admin){
         
        // test a matching password
        const isMatch = await bcrypt.compare(password, admin.password_admin);
        
        if(!isMatch){
            req.session.adminAttempt ++;
            res.status(403).json({auth: false, msg: 'Mot de passe erroné !'});
            return;
        }

        delete admin.password_admin;
        
        jwt.sign({ admin: admin }, secretKey, async (error, token) => {

            if(error) {
                console.log(error);                    
                res.status(500).json({msg: "Erreur interne !"}); 
                return;
            }

            req.session.admin = admin;
            req.session.adminToken = token;
            res.status(200).json({auth: true , token, admin: admin});
        });
    }else {
        res.status(403).json({auth: false, msg: "Cet utilisateur n'existe pas !"});
    }
    
   
    
}
//deconnexion admin
exports.deconnexionAdmin = async(req, res) => 
{
    res.setHeader("Access-Control-Allow-Origin", origineAdmin);
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    req.session.destroy(() => {
        res.status(200).json({ msg: 'Deconnection' });
    })

}

exports.verify = async (req, res) => {
  
    res.setHeader("Access-Control-Allow-Origin", origineAdmin);
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    res.status(200).json({ auth: true, admin: req.session.admin });
}